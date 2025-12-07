bullymp.events.add("playerJoin",
    function (player) {
        for (let i = 0; i < 8; i++) {
            player.sendMessage(live.colors.white, ` `);
        };

        const playerName = player.name.removeChatHex();
    }
);