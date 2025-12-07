'use strict';

global.gm = {
	utility: require('./utility'),
	roomMap: require('./roomMap'),
};

gm.roomMap.init();

bullymp.events.call('get_tp_locations')[0].push({ name: 'map1', areaId: 0, position: new Vector3(321.9175, -59.0930, 105.0134) });
bullymp.events.call('get_tp_locations')[0].push({ name: 'map2', areaId: 0, position: new Vector3(320.6844, -55.5157, 73.5) });
