'use strict';

// Инициализируем глобальный объект
global.vehicleSpawner = {
    config: require('./config'),
    chat: bullymp.events.call('get_chat')[0],
    commandManager: bullymp.events.call('get_command_manager')[0],
    playerVehicles: new Map() 
};

const commands = require('./commands');
commands(vehicleSpawner.commandManager.add.bind(vehicleSpawner.commandManager));