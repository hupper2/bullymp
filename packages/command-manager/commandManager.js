'use strict';

module.exports = class CommandManager {
	constructor() {
		this.commands = new Map();
	}
	
	get(trigger) {
		if(Array.isArray(trigger)) {
			for(const trig of trigger) {
				var inst = this.get(trig);
				if(!!inst) {
					return inst;
				}
			}
			return null;
		}
		
		const low = trigger.toLowerCase();
		for(const cmd of this.commands.entries()) {
			if(Array.isArray(cmd[0])) {
				for(const name of cmd[0]) {
					if(name.toLowerCase() === low) {
						return cmd;
					}
				}
			}
			else if(typeof cmd[0] === 'string' || cmd[0] instanceof String) {
				if(cmd[0].toLowerCase() === low) {
					return cmd;
				}
			}
		}
		return null;
	}
	
	handle(player, command, args) {
		const inst = this.get(command);
		if(!!inst) {
			args.unshift(player);
			inst[1].handler.apply(null, args);
			return true;
		}
		return false;
	}
	
	add(trigger, handler) {
		if(!!this.get(trigger)) {
			return;
		}

		var instance = {
			handler: handler,
			hidden: false,
		};
		
		this.commands.set(trigger, instance);
	}
	
	hide(trigger) {
		var inst = this.get(trigger);
		if(!!inst) {
			inst[1].hidden = true;
		}
	}
	
	getCommandList() {
		var messages = [ '' ];
		for(const cmd of this.commands.entries()) {
			if(!cmd[1].hidden) {
				var commandName = null;
				if(Array.isArray(cmd[0]) && cmd[0].length > 0) {
					commandName = cmd[0][0];
				}
				else if(typeof cmd[0] === 'string' || cmd[0] instanceof String) {
					commandName = cmd[0];
				}
				if(!!commandName) {
					var k = messages.length - 1;
					if(messages[k].length < 64) {
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
		}
		return messages;
	}
}
