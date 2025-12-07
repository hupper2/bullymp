'use strict';

function log(...args) { bullymp.print(...args); }

var vehicleUi = new WebView('package://vehicle_spawner/ui/vehicles.html');

bullymp.events.addRemoteCallable('vehiclespawner.show', function(vehicles) {
    
    if (!vehicles || !Array.isArray(vehicles)) return;
    
    vehicleUi.callEvent('vehiclespawner.clearList');
    
    for (var i = 0; i < vehicles.length; i++) {
        vehicleUi.callEvent('vehiclespawner.addVehicle', vehicles[i]);
    }
    
    vehicleUi.callEvent('vehiclespawner.show');
    
});

bullymp.events.add('vehiclespawner.spawnVehicle', function(vehicleId) {
    
    var id = Number(vehicleId);
    if (isNaN(id)) {
        return;
    }

    bullymp.events.callRemote('vehiclespawner.requestVehicle', id);
    
});