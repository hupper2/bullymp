'use strict';

// Создаем WebView для меню оружия
var weaponUi = new WebView('package://weapon_giver/ui/weapons.html');

// Обработчик для получения списка оружия
bullymp.events.addRemoteCallable('weapon_giver.show', function(weaponsList) {
    
    if (!weaponsList || !Array.isArray(weaponsList)) return;
    
    // Очищаем список
    weaponUi.callEvent('weapon_giver.clearList');
    
    // Добавляем каждое оружие
    for (var i = 0; i < weaponsList.length; i++) {
        var weapon = weaponsList[i];
        weaponUi.callEvent('weapon_giver.addWeapon', weapon.id, weapon.name, weapon.image);
    }
    
    // Показываем меню
    weaponUi.callEvent('weapon_giver.show');
    
    // Показываем курсор
    if (bullymp.showCursor) {
        bullymp.showCursor(true);
    }
});

// Обработчик для выдачи оружия
bullymp.events.add('weapon_giver.giveWeapon', function(weaponId, ammo) {
    // Преобразуем в число
    var id = Number(weaponId);
    var ammoAmount = ammo ? Number(ammo) : 64;
    
    if (isNaN(id)) {
        return;
    }
    
    // Отправляем запрос на сервер
    bullymp.events.callRemote('weapon_giver.requestWeapon', id, ammoAmount);
    
    // Скрываем курсор
    if (bullymp.showCursor) {
        bullymp.showCursor(false);
    }
});