'use strict';

// Функция для спавна транспорта
function spawnVehicleForPlayer(player, vehicleId) {
    
    const playerId = player.id;
    
    // Проверяем ID
    vehicleId = parseInt(vehicleId);
    
    if (isNaN(vehicleId)) {
        return { success: false, message: "Vehicle ID must be a number" };
    }
    
    // Диапазон ID транспорта Bully (272-298)
    if (vehicleId < 272 || vehicleId > 298) {
        return { success: false, message: "Vehicle ID must be between 272 and 298" };
    }
    
    try {
        const spawnPosition = player.position;
        const spawnRotation = player.rotation || player.heading || 0;
        
        // 2 метра перед игроком
        const offsetRot = spawnRotation * (Math.PI / 180);
        const finalX = spawnPosition.x + 2 * Math.cos(offsetRot);
        const finalY = spawnPosition.y + 2 * Math.sin(offsetRot);
        const finalZ = spawnPosition.z + 1;
        
        const spawnPos = new Vector3(finalX, finalY, finalZ);
        
        // Удаляем старую машину игрока из Map
        if (vehicleSpawner.playerVehicles.has(playerId)) {
            const oldVehicle = vehicleSpawner.playerVehicles.get(playerId);
            if (oldVehicle) {
                try {
                    // Если игрок в этой машине, вытаскиваем
                    if (player.vehicle === oldVehicle) {
                        player.removeFromVehicle();
                    }
                } catch(e) {}
                
                try {
                    oldVehicle.destroy();
                } catch(e) {}
            }
            vehicleSpawner.playerVehicles.delete(playerId);
        }
        
        const vehicle = new Vehicle(vehicleId, spawnPos, spawnRotation, 0, 0);
        
        // Автоматически сажаем игрока в транспорт
        setTimeout(() => {
            try {
                player.putIntoVehicle(vehicle, 0); // 0 = место водителя
            } catch(e) {
                console.log("Auto-enter failed:", e.message);
            }
        }, 100);
        
        // Сохраняем в Map
        vehicleSpawner.playerVehicles.set(playerId, vehicle);
        
        return {
            success: true,
            vehicle: vehicle,
            message: `Vehicle ID ${vehicleId} spawned!`
        };
        
    } catch (error) {
        console.error("Error spawning vehicle:", error);
        return {
            success: false,
            message: `Error: ${error.message}`
        };
    }
}



// Remote callable для спавна транспорта через UI
bullymp.events.addRemoteCallable('vehiclespawner.requestVehicle', function(player, vehicleId) {
    
    const result = spawnVehicleForPlayer(player, vehicleId);
    if (vehicleSpawner.chat) {
        if (result.success) {
            vehicleSpawner.chat.send(player, vehicleSpawner.config.colors.green, result.message);
        } else {
            vehicleSpawner.chat.send(player, vehicleSpawner.config.colors.red, result.message);
        }
    }
});

module.exports = function(register) {
    
    // КОМАНДА /vehicle для показа меню
    register(['vehicle', 'veh', 'v'], (player, vehicleId) => {
        
        if (typeof vehicleId === 'undefined') {
                    
            // Отправляем массив ID
            bullymp.events.callRemote(player, 'vehiclespawner.show', vehicleSpawner.config.vehicle_ids);
            return;
        }
        
        // Спавн по ID из команды
        const result = spawnVehicleForPlayer(player, vehicleId);
        if (vehicleSpawner.chat) {
            if (result.success) {
                vehicleSpawner.chat.send(player, vehicleSpawner.config.colors.green, result.message);
            } else {
                vehicleSpawner.chat.send(player, vehicleSpawner.config.colors.red, result.message);
            }
        }
    });
    
    // Команда удаления машины
    register(['clear', 'destroy', 'rc'], (player) => {
        const playerId = player.id;
        let cleared = false;
        
        if (vehicleSpawner.playerVehicles.has(playerId)) {
            const vehicle = vehicleSpawner.playerVehicles.get(playerId);
            if (vehicle) {
                try {
                    if (player.vehicle === vehicle) {
                        player.removeFromVehicle();
                    }
                } catch(e) {}
                
                try {
                    vehicle.destroy();
                    cleared = true;
                } catch(e) {}
            }
            vehicleSpawner.playerVehicles.delete(playerId);
        }
        
        if (vehicleSpawner.chat) {
            if (cleared) {
                vehicleSpawner.chat.send(player, vehicleSpawner.config.colors.green, 'Your vehicle removed!');
            } else {
                vehicleSpawner.chat.send(player, vehicleSpawner.config.colors.red, 'You don\'t have a vehicle!');
            }
        }
    });
};

// Очистка транспорта при выходе
bullymp.events.add('playerLeave', (player) => {
    if (!player || !player.id) return;
    
    const playerId = player.id;
    
    if (vehicleSpawner.playerVehicles.has(playerId)) {
        const vehicle = vehicleSpawner.playerVehicles.get(playerId);
        if (vehicle) {
            try {
                vehicle.destroy();
            } catch(e) {}
        }
        vehicleSpawner.playerVehicles.delete(playerId);
    }
});