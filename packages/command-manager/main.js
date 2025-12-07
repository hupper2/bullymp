'use strict';

const commandManager = new (require('./commandManager'))();
bullymp.events.add('get_command_manager', () => commandManager);
