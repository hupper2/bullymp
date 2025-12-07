'use strict';

// Простая функция striptags
const striptags = {
    stripTags: function(text, allowedTags) {
        if (typeof text !== 'string') return text;
        
        if (allowedTags && allowedTags.length > 0) {
            const tagsPattern = new RegExp(`</?(?!(${allowedTags.join('|')})\\b)[^>]*>`, 'gi');
            return text.replace(tagsPattern, '');
        }
        
        return text.replace(/<[^>]*>/g, '');
    }
};

const white = new RGB(255, 255, 255);
const lightgrey = new RGB(190, 190, 190);

function toHex(n) {
    var hex = Number(n).toString(16);
    if(hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}

function formatMessage(color, message) {
    var hexColor = toHex(color.r) + toHex(color.g) + toHex(color.b);
    return '<font style=\"color: #' + hexColor + '\">' + message + '</font>';
}

// Безопасное получение commandManager
let commandManager = null;
try {
    const cmdResult = bullymp.events.call('get_command_manager');
    if (cmdResult && cmdResult.length > 0) {
        commandManager = cmdResult[0];
    }
} catch (error) {}

function onPlayerMessage(player, message) {
    if (!message || message.length < 1) {
        return;
    }

    const cleanMessage = striptags.stripTags(message);
    
    // Команда
    if (cleanMessage.startsWith('/')) {
        let command = cleanMessage.substr(1);
        let args = command.match(/('(\\'|[^'])*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g) || [];
        
        for(var i = 1; i < args.length; i++) {
            if(args[i].substr(0, 1) === '"' || args[i].substr(0, 1) === "'") {
                try {
                    args[i] = JSON.parse(args[i]);
                } catch(e) {}
            }
        }
        
        if(args.length === 0) {
            return;
        }
        
        let commandName = args.splice(0, 1)[0];
        
        if (commandManager && commandManager.handle) {
            if(!commandManager.handle(player, commandName, args)) {
                chat.send(player, lightgrey, "Unknown command!");
            }
        } else {
            chat.send(player, lightgrey, "Command system not available!");
        }
    } 
    else {
        // Обычное сообщение - отправляем всем
        chat.broadcast(white, formatMessage(player.color, player.name + ': ') + cleanMessage);
    }
}

// Регистрируем обработчик
bullymp.events.addRemoteCallable('chat.sendMessage', onPlayerMessage);

// Создаем обработчик события если его нет
try {
    bullymp.events.add('chat.onPlayerMessage', function(player, message) {
        return [true]; // Разрешаем отправку
    });
} catch (e) {}

const chat = {
    colors: {
        lightgrey: new RGB(190, 190, 190),
        white: new RGB(255, 255, 255)
    },

    setVisible: function(target, visible) {
        bullymp.events.callRemote(target, 'chat.setVisible', visible);
    },

    send: function(target, color, message) {
        bullymp.events.callRemote(target, 'chat.postmessage', formatMessage(color, message));
    },
    
    broadcast: function(color, message) {
        bullymp.events.callRemote(null, 'chat.postmessage', formatMessage(color, message));
    }
};

// Экспортируем чат
bullymp.events.add('get_chat', () => chat);