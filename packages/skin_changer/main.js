'use strict';

global.skinChanger = {
    config: require('./config'),
    chat: bullymp.events.call('get_chat')[0],
    commandManager: bullymp.events.call('get_command_manager')[0]
};

var commands = require('./commands');
commands(skinChanger.commandManager.add.bind(skinChanger.commandManager));