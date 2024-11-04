const unwantedParameters = ["forcedownload", "autodownload", "download", "dl"]

function cleanUrl(details) {
    let url = new URL(details.url);
    let changed = false;
    
    unwantedParameters.forEach(param => {
        if (url.searchParams.has(param)) {
            url.searchParams.delete(param);
            changed = true;
        }
    });
    
    if (changed) {
        return {
            redirectUrl: url.toString(),
        }
    }
}

browser.webRequest.onBeforeRequest.addListener(
    cleanUrl,
    { urls: ["<all_urls>"] },
    ["blocking"]
);
