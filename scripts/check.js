//var redBorder = {"border-color": "red","border-width":"3px", "border-style":"solid"};
//var greenBorder = {"border-color": "green","border-width":"1px", "border-style":"solid"};

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.redBorder { border-color: red;border-width:3px;border-style:solid;} .greenBorder { border-color: green;border-width:1px;border-style:solid;}';
document.getElementsByTagName('head')[0].appendChild(style);

// Listener to receive msg event
browser.runtime.onMessage.addListener(drawBorder);

function showDialog(dialogText, $currObj) {
    if($('#DIALOG1').length){
	$( "#DIALOG1" ).remove();
	}
	drawDialog(dialogText, $currObj);
}

function drawDialog(dialogText, $currObj){
	var x = document.createElement("DIALOG");
    x.setAttribute("id", "DIALOG1");
	x.style.zIndex = "10000";
	$('#DIALOG1').css('text-align','left');
    x.setAttribute("open", "open");
    x.innerHTML = dialogText;
    $currObj.after(x);
}

// color code link
function colorCodeDOMs($dom){
	var dataObj = $dom.attr('data-object');
	var dataReason = $dom.attr('data-reason');
	var dataType = $dom.attr('data-type');
	var linkClass = $dom.attr('class');
	var linkTitle = $dom.attr('title');
	var linkAttr = $dom.attr('href');
	var std = false;
	if(typeof dataObj !== 'undefined' && typeof dataReason !== 'undefined' && typeof dataType !== 'undefined' && typeof linkClass !== 'undefined' && typeof linkTitle !== 'undefined' && (linkClass.indexOf('ensightenEvent') >= 0)){
        //$dom.css({"border-color": "green","border-width":"1px", "border-style":"solid"});
        //$dom.css(greenBorder);
        $dom.addClass("greenBorder");
	}else{
        //$dom.css({"border-color": "red","border-width":"3px", "border-style":"solid"});
        //$dom.css(redBorder);
        $dom.addClass("redBorder");
	}   
}

function collectData($obj){
    var dataObj = $obj.attr('data-object');
	var dataReason =$obj.attr('data-reason');
	var dataType = $obj.attr('data-type');
	var linkClass = $obj.attr('class');
	var linkTitle = $obj.attr('title');
	var linkAttr = $obj.attr('href');
	var toolTip = "<b>data-object: </b>" + dataObj + "<br /><b>data-reason: </b>"+ dataReason + "<br /><b>data-type: </b>" + dataType +"<br /><b>Class: </b>"+ linkClass +" <br /><b>Title: </b>"+linkTitle+" <br /><b>Link: </b>"+linkAttr;
	showDialog(toolTip, $obj);
}

//onCall draw borders for each elements
function drawBorder(request, sender, sendResponse) {
    if ($('.greenBorder')[0] || $('.redBorder')[0]) {
        $(".greenBorder").removeClass("greenBorder");
        $(".redBorder").removeClass("redBorder");
        $( "#DIALOG1" ).remove();

    } else {
        $("a, input, button").each(function(idx) {
            colorCodeDOMs($(this));  
        });
        // populate link data
		$("a, input, button").mouseenter(function(){
			collectData($(this));
		});
    }
}