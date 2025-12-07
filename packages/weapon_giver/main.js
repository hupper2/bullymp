'use strict';

// Ждем загрузки зависимостей
setTimeout(function() {
    try {
        global.weaponGiver = {
            config: require('./config'),
            chat: bullymp.events.call('get_chat')[0],
            commandManager: bullymp.events.call('get_command_manager')[0]
        };

        var commands = require('./commands');
        
        if (weaponGiver.commandManager && weaponGiver.commandManager.add) {
            commands(weaponGiver.commandManager.add.bind(weaponGiver.commandManager));
            console.log('[Weapon Giver] Commands registered');
        } else {
            console.error('[Weapon Giver] Command manager not available');
        }
    } catch (error) {
        console.error('[Weapon Giver] Init error:', error);
    }
}, 1000);