'use strict';

function log(...args) { bullymp.print(...args); }

var tpui = new WebView('package://teleport/ui/teleports.html');

bullymp.events.addRemoteCallable('teleports.show', function(locations) {
    for(var locidx in locations)
    {
        tpui.callEvent('teleports.addLocation', locations[locidx]);
    }
    tpui.callEvent('teleports.show');
});

bullymp.events.add('teleports.teleportTo', function(loc) {
    bullymp.events.callRemote('teleports.requestTeleport', loc); // implement
    log("Teleport to: " + loc);
});

