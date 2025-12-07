const printMessagePlayerJoin = function (player) {
    bullymp.print(`[JOIN] ${player.name}(${player.id}) has joined to server.`);

    const playerName = player.name; // Убираем removeChatHex если нет
    const playerColor = player.color; // Сохраняем объект RGB
    
    // Форматируем сообщение
    const message = `* ${playerName}(${player.id}) has joined to server.`;
    
    // Отправляем в чат через chat.broadcast
    if (typeof chat !== 'undefined' && chat.broadcast) {
        chat.broadcast(playerColor, message);
    } else {
        // Альтернативный способ
        bullymp.events.callRemote(null, 'chat.postmessage', 
            `<font color="#${getColorHex(playerColor)}">${message}</font>`);
    }
};

bullymp.events.add(`playerJoin`, printMessagePlayerJoin);

const printMessagePlayerQuit = function (player) {
    bullymp.print(`[QUIT] ${player.name}(${player.id}) leave from server.`);

    const playerName = player.name;
    const playerColor = player.color;
    
    // Форматируем сообщение
    const message = `* ${playerName}(${player.id}) leave from server.`;
    
    // Отправляем в чат
    if (typeof chat !== 'undefined' && chat.broadcast) {
        const redColor = new RGB(255, 0, 0);
        chat.broadcast(redColor, message);
    } else {
        bullymp.events.callRemote(null, 'chat.postmessage', 
            `<font color="#FF0000">${message}</font>`);
    }
};

bullymp.events.add(`playerQuit`, printMessagePlayerQuit);

// Вспомогательная функция для конвертации RGB в HEX
function getColorHex(color) {
    if (!color || typeof color.r === 'undefined') return 'FFFFFF';
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length < 2 ? '0' + hex : hex;
    };
    return toHex(color.r) + toHex(color.g) + toHex(color.b);
}