'use strict';

module.exports = {
    colors: {
        red: new RGB(255, 0, 0),
        green: new RGB(0, 255, 0),
        blue: new RGB(0, 100, 255),
        orange: new RGB(255, 165, 0),
        lightgrey: new RGB(190, 190, 190)
    },
    
    // Черный список оружия
    weaponBlacklist: [1, 4, 6, 10, 12, 13, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26],
    
    // Доступное оружие
    availableWeapons: [0, 2, 3, 5, 7, 8, 9, 11, 14, 15, 23, 139]
};