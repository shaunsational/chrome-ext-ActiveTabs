var countTabs = function() {
	chrome.tabs.query({},function(tabs){
		chrome.browserAction.setBadgeText( { text:tabs.length.toString() } );
	});
}

var listURLs = function() {
	chrome.windows.getAll({populate:true},function(windows){
		var tabData = [];
		windows.forEach(function(window){
			tabData[window.id] = [];
			window.tabs.forEach(function(tab){
				tabData[tab.windowId].push({
					id: tab.id,
					title: tab.title,
					incognito: tab.incognito,
					url: tab.url,
					icon: tab.favIconUrl
				});
			});
		});
		for(var window in tabData) {
			for(var tab in tabData[window]) {
				console.log(tabData[window][tab]);
			}
		}
	});
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	countTabs();
});

chrome.tabs.onRemoved.addListener(function(tabId){
	countTabs();
});

countTabs();