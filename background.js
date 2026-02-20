chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translate-selection",
        title: "Traduzir com Tradutor MSA",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translate-selection" && info.selectionText) {
        // Open popup.html in a new small window with the text as a parameter
        const text = encodeURIComponent(info.selectionText);
        const width = 340;
        const height = 500;

        // Calculate center (optional, mainly for UX)
        // Note: 'bg' scripts don't have access to screen dimensions easily in MV3 non-persistent, 
        // but we can just let OS decide or use default top/left.

        chrome.windows.create({
            url: `popup.html?text=${text}&auto=true`,
            type: "popup",
            width: width,
            height: height
        });
    }
});
