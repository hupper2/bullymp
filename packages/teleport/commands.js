'use strict';

bullymp.events.addRemoteCallable('teleports.requestTeleport', function(player, location_name) {
	for(let i = 0; i < gm.config.tp_locations.length; i++) {
		if(gm.config.tp_locations[i].name.toLowerCase() == location_name.toLowerCase()) {
			player.areaTransition(gm.config.tp_locations[i].areaId, gm.config.tp_locations[i].position);
			break;
		}
	}
});


module.exports = function(register) {
	register(['teleport', 'tp'], (player, location_name) => {
		if(typeof location_name === 'undefined') {
			gm.chat.send(player, gm.config.colors.lightgrey, 'USAGE: /tp [location] or use the teleports menubar.');

			var telesimple = Array();
			for(let i = 0; i < gm.config.tp_locations.length; i++) {
				var name = gm.config.tp_locations[i].name;
				telesimple.push(name);
			}

			bullymp.events.callRemote(player, 'teleports.show', telesimple);
			return;
		}

		for(let i = 0; i < gm.config.tp_locations.length; i++) {
			if(gm.config.tp_locations[i].name.toLowerCase() == location_name.toLowerCase()) {
				player.areaTransition(gm.config.tp_locations[i].areaId, gm.config.tp_locations[i].position);
				break;
			}
		}
	});
};
