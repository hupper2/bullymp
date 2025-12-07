'use strict';

function log() { 
    var args = Array.prototype.slice.call(arguments);
    bullymp.print.apply(bullymp, args);
}

// Создаем WebView для меню
var skinUi = new WebView('package://skin_changer/ui/skins.html');

// Обработчик для получения списка скинов
bullymp.events.addRemoteCallable('skinchanger.show', function(skinIds) {
    
    if (!skinIds || !Array.isArray(skinIds)) return;
    
    // Очищаем список
    skinUi.callEvent('skinchanger.clearList');
    
    // Добавляем каждый ID
    for (var i = 0; i < skinIds.length; i++) {
        skinUi.callEvent('skinchanger.addSkin', skinIds[i]);
    }
    
    // Показываем меню
    skinUi.callEvent('skinchanger.show');
    
    // Показываем курсор
    if (bullymp.showCursor) {
        bullymp.showCursor(true);
    }
});

// Обработчик для смены скина
bullymp.events.add('skinchanger.changeSkin', function(skinId) {
    log("Skin change ID: " + skinId);
    
    // Преобразуем в число
    var id = Number(skinId);
    if (isNaN(id)) {

        return;
    }
    
    // Отправляем запрос на сервер
    bullymp.events.callRemote('skinchanger.requestSkin', id);
    
    // Скрываем курсор
    if (bullymp.showCursor) {
        bullymp.showCursor(false);
    }
});