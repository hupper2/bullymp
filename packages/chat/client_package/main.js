'use strict';

var ui = new WebView('package://chat/ui/index.html');
var domLoaded = false;
var earlyMessages = [];

bullymp.events.addRemoteCallable('webViewDocumentReady', function(view, url) {
	if(view == ui) {
		domLoaded = true;
		for(var i = 0; i < earlyMessages.length; i++) {
			ui.callEvent('chatMessage', earlyMessages[i]);
		}
	}
});

bullymp.events.addRemoteCallable('chat.setVisible', function(visible) {
	if(domLoaded) {
		ui.callEvent('setVisible', visible);
	}
});

bullymp.events.addRemoteCallable('chat.postmessage', function(message) {
	if(domLoaded) {
		ui.callEvent('chatMessage', message);
	} else {
		earlyMessages.push(message);
	}
});

bullymp.events.add('submitChatMessage', function(message) {
	bullymp.events.callRemote('chat.sendMessage', message);
});