'use strict';

module.exports = {
    colors: {
        red: new RGB(255, 0, 0),
        green: new RGB(0, 255, 0),
        blue: new RGB(0, 100, 255),
        orange: new RGB(255, 165, 0),
        lightgrey: new RGB(190, 190, 190),
        tomato: new RGB(255, 99, 71)
    },

     skin_ids: (function() {
        var ids = [];
        for (var i = 0; i <= 258; i++) {
            ids.push(i);
        }
        return ids;
    })()
    };