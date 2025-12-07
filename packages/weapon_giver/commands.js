'use strict';

module.exports = function(register) {
    
    // Команда /weapon - показать меню
    register(['giveweapon','gw'], function(player, weaponId, ammo) {
        // Если указан ID - выдать сразу
        if (typeof weaponId !== 'undefined') {
            giveWeaponToPlayer(player, weaponId, ammo);
            return;
        }
        
        // Если нет ID - показать меню
        var weaponsList = [];
        
        // Добавляем доступное оружие
        for (let weaponId of weaponGiver.config.availableWeapons) {
            weaponsList.push({
                id: weaponId,
                name: getWeaponName(weaponId),
                image: null
            });
        }
        
        // Отправляем список в UI
        bullymp.events.callRemote(player, 'weapon_giver.show', weaponsList);
    });
    
    // Remote callable для выдачи оружия из UI
    bullymp.events.addRemoteCallable('weapon_giver.requestWeapon', function(player, weaponId, ammo) {
        giveWeaponToPlayer(player, weaponId, ammo);
    });
    
    // Функция получения имени оружия
    function getWeaponName(weaponId) {
        var weaponNames = {
            0: "Fists",
            2: "Baseball Bat",
            3: "Bat",
            5: "Hammer",
            7: "Shovel",
            8: "Golf Club",
            9: "Pocket Knife",
            11: "Rock",
            14: "Nailbat",
            15: "Pipe",
            23: "Grenade Launcher",
            139: "Skateboard"
        };
        
        return weaponNames[weaponId] || "Weapon " + weaponId;
    }
    
    // Функция выдачи оружия
    function giveWeaponToPlayer(player, weaponId, ammo) {
        // Проверяем ID
        var id = parseInt(weaponId);
        if (isNaN(id)) {
            if (weaponGiver.chat) {
                weaponGiver.chat.send(player, new RGB(255, 0, 0), 
                    "Weapon ID must be a number!");
            }
            return;
        }
        
        // Проверяем диапазон
        if (id < 0 || id > 139) {
            if (weaponGiver.chat) {
                weaponGiver.chat.send(player, new RGB(255, 0, 0), 
                    "Weapon ID must be between 0 and 139!");
            }
            return;
        }
        
        // Проверяем черный список
        if (weaponGiver.config.weaponBlacklist.includes(id)) {
            if (weaponGiver.chat) {
                weaponGiver.chat.send(player, new RGB(255, 0, 0), 
                    "This weapon is blacklisted!");
            }
            return;
        }
        
        try {
            // Выдаем оружие
            player.giveWeapon(id);
            
            // Выдаем патроны
            var ammoAmount = ammo || 64;
            if (ammo) {
                var parsedAmmo = parseInt(ammo);
                if (!isNaN(parsedAmmo) && parsedAmmo > 0) {
                    ammoAmount = parsedAmmo;
                }
            }
            
            player.giveAmmo(id, ammoAmount);
            
            if (weaponGiver.chat) {
                var weaponName = getWeaponName(id);
                weaponGiver.chat.send(player, new RGB(0, 255, 0), 
                    `You received ${weaponName} (ID: ${id}) with ${ammoAmount} ammo!`);
            }
            
        } catch (error) {
            if (weaponGiver.chat) {
                weaponGiver.chat.send(player, new RGB(255, 0, 0), 
                    "Error giving weapon: " + error.message);
            }
        }
    }
};