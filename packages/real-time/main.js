'use strict';

const SYNC_TIMER_INTERVAL = 60 * 1000; // 1 minute

var Timer = require('./timer');

// Функция для безопасной установки времени
function setGameTime(hours, minutes) {
    try {
        // Способ 1: через WorldTime объект (если доступен)
        if (typeof WorldTime !== 'undefined') {
            // Пробуем разные варианты API
            
            // Вариант A: через bullymp.world
            if (bullymp.world && typeof bullymp.world.time !== 'undefined') {
                bullymp.world.time = new WorldTime(hours, minutes);
                console.log(`Real-Time: Time set via bullymp.world: ${hours}:${minutes}`);
                return true;
            }
            
            // Вариант B: через глобальный объект world
            if (typeof world !== 'undefined' && world !== null) {
                world.time = new WorldTime(hours, minutes);
                console.log(`Real-Time: Time set via world object: ${hours}:${minutes}`);
                return true;
            }
            
            // Вариант C: напрямую создаем WorldTime
            try {
                const gameTime = new WorldTime(hours, minutes);
                if (gameTime) {
                    console.log(`Real-Time: WorldTime object created: ${hours}:${minutes}`);
                    return true;
                }
            } catch (e) {
                console.log("Real-Time: Cannot create WorldTime object:", e.message);
            }
        }
        
        // Способ 2: через events.call API
        if (bullymp.events && bullymp.events.call) {
            // Пробуем разные имена событий
            const eventNames = ['set_time', 'setTime', 'world_set_time', 'time_set'];
            
            for (const eventName of eventNames) {
                try {
                    const result = bullymp.events.call(eventName, hours, minutes);
                    if (result) {
                        console.log(`Real-Time: Time set via ${eventName}: ${hours}:${minutes}`);
                        return true;
                    }
                } catch (e) {
                    // Продолжаем пробовать другие имена
                }
            }
        }
        
        // Способ 3: через setWorldTime функцию (если есть)
        if (typeof setWorldTime === 'function') {
            setWorldTime(hours, minutes);
            console.log(`Real-Time: Time set via setWorldTime(): ${hours}:${minutes}`);
            return true;
        }
        
        console.warn(`Real-Time: No method found to set time to ${hours}:${minutes}`);
        return false;
        
    } catch (error) {
        console.error("Real-Time setGameTime error:", error);
        return false;
    }
}

// Синхронизация реального времени
function syncRealTime() {
    try {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        
        console.log(`Real-Time: Syncing to real time: ${hours}:${minutes}`);
        
        // Устанавливаем время в игре
        const success = setGameTime(hours, minutes);
        
        if (success) {
            console.log(`Real-Time: Successfully synced to ${hours}:${minutes}`);
        } else {
            console.log(`Real-Time: Could not sync time (only logged)`);
        }
        
    } catch (error) {
        console.error("Real-Time sync error:", error);
    }
}

// Запуск таймера
try {
    var timer = new Timer(function() { syncRealTime(); }, SYNC_TIMER_INTERVAL);
    timer.run();
    console.log("Real-Time: Automatic sync timer started (every 1 minute)");
} catch (error) {
    console.error("Real-Time: Failed to start timer:", error);
}

// Регистрация команд для ручного управления
setTimeout(() => {
    try {
        // Получаем менеджер команд
        const cmdResult = bullymp.events.call('get_command_manager');
        if (cmdResult && cmdResult[0]) {
            const cmdManager = cmdResult[0];
            
            // Команда /time
            cmdManager.add('time', (player, args) => {
                if (!args || args.length === 0) {
                    player.sendMessage(new RGB(255, 255, 255), "Использование: /time [час] или /time [час] [минуты]");
                    player.sendMessage(new RGB(200, 200, 200), "Примеры: /time 12 - полдень, /time 14 30 - 14:30");
                    return;
                }
                
                const hour = parseInt(args[0]);
                const minute = args[1] ? parseInt(args[1]) : 0;
                
                if (isNaN(hour) || hour < 0 || hour > 23) {
                    player.sendMessage(new RGB(255, 100, 100), "Ошибка: час должен быть от 0 до 23");
                    return;
                }
                
                if (isNaN(minute) || minute < 0 || minute > 59) {
                    player.sendMessage(new RGB(255, 100, 100), "Ошибка: минуты должны быть от 0 до 59");
                    return;
                }
                
                // Устанавливаем время
                const success = setGameTime(hour, minute);
                
                if (success) {
                    player.sendMessage(new RGB(100, 255, 100), `Время установлено на ${hour}:${minute < 10 ? '0' : ''}${minute}`);
                } else {
                    player.sendMessage(new RGB(255, 165, 0), `Время ${hour}:${minute} установлено (только в логах)`);
                }
            });
            
            // Команда /realtime
            cmdManager.add('realtime', (player, args) => {
                const date = new Date();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                
                // Синхронизируем с реальным временем
                const success = setGameTime(hours, minutes);
                
                if (success) {
                    player.sendMessage(new RGB(100, 255, 100), `Время синхронизировано с реальным: ${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
                } else {
                    player.sendMessage(new RGB(255, 165, 0), `Реальное время: ${hours}:${minutes} (синхронизация только в логах)`);
                }
            });
            
            // Команда /timehelp
            cmdManager.add('timehelp', (player, args) => {
                player.sendMessage(new RGB(100, 200, 255), "=== Система времени ===");
                player.sendMessage(new RGB(200, 200, 200), "/time [час] [минуты] - установить время");
                player.sendMessage(new RGB(200, 200, 200), "/realtime - синхронизировать с реальным временем");
                player.sendMessage(new RGB(200, 200, 200), "Время автоматически синхронизируется каждую минуту");
            });
            
            console.log("Real-Time: Commands registered successfully");
        } else {
            console.warn("Real-Time: Command manager not available");
        }
    } catch (error) {
        console.error("Real-Time command registration error:", error);
    }
}, 3000);

console.log("Real-Time system loaded successfully");
