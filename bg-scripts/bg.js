/* Retrieve any previously set cookie and send to content script */

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function callTagChecker() {
  getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, 'add');
    });
}

function removeChecker(){
  getActiveTab().then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, 'remove');
});
}
browser.browserAction.onClicked.removeListener(() => {
  removeChecker();
});
browser.browserAction.onClicked.addListener(() => {
  callTagChecker();
});
//console.log(browser.browserAction.onClicked.hasListener());



