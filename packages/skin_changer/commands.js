'use strict';

// Функция для смены скина игрока
function changePlayerSkin(player, skinId) {
    
    // Проверяем ID
    skinId = parseInt(skinId);
    
    if (isNaN(skinId)) {
        return { success: false, message: "Skin ID must be a number" };
    }
    
    // Диапазон ID скинов Bully (0-258)
    if (skinId < 0 || skinId > 258) {
        return { success: false, message: "Skin ID must be between 0 and 258" };
    }
    
    try {
        // Сохраняем старый ID для сообщения
        var oldSkinId = player.modelId || 0;
        
        // Меняем скин
        player.modelId = skinId;
        
        return {
            success: true,
            message: "Skin changed to " + skinId + "!"
        };
        
    } catch (error) {
        console.error("Error changing skin:", error);
        return {
            success: false,
            message: "Error: " + error.message
        };
    }
}

// Remote callable для смены скина через UI
bullymp.events.addRemoteCallable('skinchanger.requestSkin', function(player, skinId) {
    
    var result = changePlayerSkin(player, skinId);
    if (skinChanger.chat) {
        if (result.success) {
            skinChanger.chat.send(player, skinChanger.config.colors.green, result.message);
        } else {
            skinChanger.chat.send(player, skinChanger.config.colors.red, result.message);
        }
    }
});

module.exports = function(register) {
    
    // КОМАНДА /skin для показа меню
    register(['skin', 's', 'setskin', 'model'], function(player, skinId) {
        
        if (typeof skinId === 'undefined') {
            
            // Отправляем только ID (как у машин)
            bullymp.events.callRemote(player, 'skinchanger.show', skinChanger.config.skin_ids);
            return;
        }
        
        // Смена скина по ID из команды
        var result = changePlayerSkin(player, skinId);
        if (skinChanger.chat) {
            if (result.success) {
                skinChanger.chat.send(player, skinChanger.config.colors.green, result.message);
            } else {
                skinChanger.chat.send(player, skinChanger.config.colors.red, result.message);
            }
        }
    });
    
    // Команда для сброса скина на стандартный
    register(['resetskin', 'defaultskin'], function(player) {
        var result = changePlayerSkin(player, 0);
        
        if (skinChanger.chat) {
            if (result.success) {
                skinChanger.chat.send(player, skinChanger.config.colors.green, 'Skin reset to default!');
            } else {
                skinChanger.chat.send(player, skinChanger.config.colors.red, result.message);
            }
        }
    });
    
    // Команда для проверки текущего скина
    register(['myskin', 'currentskin'], function(player) {
        var currentSkin = player.modelId || 0;
        skinChanger.chat.send(player, skinChanger.config.colors.blue, 
            "Your current skin ID: " + currentSkin);
    });
};