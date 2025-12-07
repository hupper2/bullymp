'use strict';

const commandManager = bullymp.events.call('get_command_manager')[0];
const chat = bullymp.events.call('get_chat')[0];
const anims = require('./anims');
const lightgrey = new RGB(190, 190, 190);

for(var i = 0; i < anims.length; ++i) {
	var anim = anims[i];
	var handler = null;
	if(anim.params.length == 1) {
		handler = function(player) {
			player.applyAnimation(this[0]);
		}.bind(anim.params);
	}
	else if(anim.params.length == 11) {
		handler = function(player) {
			player.applyAnimation(this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10]);
		}.bind(anim.params);
	}
	if(!!handler) {
		commandManager.add(anim.cmd, handler);
		commandManager.hide(anim.cmd);
	}
}

commandManager.add(['anims', 'animlist', 'animations'], function(player) {
	var messages = [ '' ];
	for(var i = 0; i < anims.length; ++i) {
		var anim = anims[i];
		var commandName = null;
		if(Array.isArray(anim.cmd) && anim.cmd.length > 0) {
			var maxLen = anim.cmd[0].length, maxId = 0;
			for(var j = 1; j < anim.cmd.length; ++j) {
				var len = anim.cmd[j].length;
				if(maxLen < len) {
					maxLen = len;
					maxId = j;
				}
			}
			commandName = anim.cmd[maxId];
		}
		else if(typeof anim.cmd === 'string' || anim.cmd instanceof String) {
			commandName = anim.cmd;
		}
		
		if(!!commandName) {
			var k = messages.length - 1;
			if(messages[k].length < 90) {
				if(messages[k].length > 0) {
					messages[k] += ', ';
				}
				messages[k] += '/' + commandName;
			}
			else {
				messages.push('');
			}
		}
	}
	for(var i = 0; i < messages.length; ++i) {
		chat.send(player, lightgrey, messages[i]);
	}
});
