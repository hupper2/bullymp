'use strict';

global.gm = {
	config: require('./config'),
	commandManager: bullymp.events.call('get_command_manager')[0],
	chat: bullymp.events.call('get_chat')[0],
	commands: require('./commands'),
};

gm.commands(gm.commandManager.add.bind(gm.commandManager));

bullymp.events.add('get_tp_locations', () => gm.config.tp_locations);
