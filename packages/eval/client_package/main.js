'use strict';

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

bullymp.events.addRemoteCallable('eval', function(code) {
	try {
		let result = eval(code);
		bullymp.events.call('chat.postmessage', '<font color="green">' + escapeHtml(`CLIENT EVAL: ${result}`) + '</font>');
	}
	catch(e) {
		bullymp.events.call('chat.postmessage', '<font color="red">' + escapeHtml(`CLIENT EVAL: ${e}`) + '</font>');
	}
});
