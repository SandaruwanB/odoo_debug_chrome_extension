document.getElementById("debug").addEventListener("click", async function () {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: modifyUrlAndReload,
        args: [1]
    });
});
document.getElementById("debugAssets").addEventListener("click", async function(){
    let [tab] = await chrome.tabs.query({active : true, currentWindow : true});

    chrome.scripting.executeScript({
        target : {tabId: tab.id},
        func : modifyUrlAndReload,
        args : ["assets"]
    });
});
document.getElementById("debugTestAssets").addEventListener("click", async function (){
    let [tab] = await chrome.tabs.query({active : true, currentWindow : true});

    chrome.scripting.executeScript({
        target : {tabId: tab.id},
        func: modifyUrlAndReload,
        args: ["assets%2Ctests"]
    });
});
document.getElementById("cancelDebug").addEventListener("click", async function(){
    let [tab] = await chrome.tabs.query({active : true, currentWindow : true});

    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        func : removeDebugMode,
        args : []
    });
});



function modifyUrlAndReload(paramValue) {
    let url = new URL(window.location.href);
    url.searchParams.set("debug", paramValue);
    window.location.href = url.toString();
}

function removeDebugMode() {
    let url = new URL(window.location.href);
    url.searchParams.delete("debug");
    
    window.history.replaceState({}, document.title, url.toString());
    window.location.reload();
}