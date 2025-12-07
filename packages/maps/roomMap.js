'use strict';

/* by SWEGTA */

module.exports = class RoomMap {
	static init() {
		/*** My little nigger room ***/

		// Wall (BACK!)
		gm.utility.createWorldObject(1895, 317.4881, -55.19, 70, 0, 0 , 0);
		gm.utility.createWorldObject(1895, 317.4881, -55.19, 73.5, 0, 0 , 0);

		// Wall (BACK COVER!)
		gm.utility.createWorldObject(1861, 317.4881 + 1.1, 	-55.19 + 0.5, 73.0, 0, 90 , 270);
		gm.utility.createWorldObject(1861, 317.4881 + 1.1, 	-55.19 + 0.5 - 3.02, 73.0, 0, 90 , 270);
		gm.utility.createWorldObject(1861, 317.4881 + 1.1, 	-55.19 + 0.5 - 6.02, 73.0, 0, 90 , 270);

		// Center 1 (FLOOR)
		gm.utility.createWorldObject(1864, 317.4881 + 2.5, -55.1934, 70, 0, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 5, -55.1934, 70, 0, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 7.5, -55.1934, 70, 0, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 10, -55.1934, 70, 0, 0 , 0);

		// Center 1 (FLOOR COVER!)
		//gm.utility.createWorldObject(5323, 317.4881 + 10.2, -55.1934, 73, 90, 0 , 0);

		// Center 1 (ROOF!)
		gm.utility.createWorldObject(1864, 317.4881 + 2.5, 	-55.1934, 77.6, 180, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 5, 		-55.1934, 77.6, 180, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 7.5, 	-55.1934, 77.6, 180, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 10, 		-55.1934, 77.6, 180, 0 , 0);

		// Wall (FRONT!)
		gm.utility.createWorldObject(1895, 317.4881 + 12, 	-55.19, 70, 0, 0 , 0);
		gm.utility.createWorldObject(1895, 317.4881 + 12, 	-55.19, 73.5, 0, 0 , 0);

		// Wall (FRONT COVER!)
		gm.utility.createWorldObject(1861, 317.4881 + 10.909, 	-55.19 - 0.31, 73.0, 0, 90 , 90);
		gm.utility.createWorldObject(1861, 317.4881 + 10.909, 	-55.19 - 0.31 - 3.02, 73.0, 0, 90 , 90);
		gm.utility.createWorldObject(1861, 317.4881 + 10.909, 	-55.19 - 0.31 - 6.02, 73.0, 0, 90 , 90);

		// Wall (LEFT!)
		gm.utility.createWorldObject(1895, 317.4881 + 5, 	-55.12 + 3, 70, 0, 0 , 90);
		gm.utility.createWorldObject(1895, 317.4881 + 5, 	-55.12 + 3, 73.5, 0, 0 , 90);

		// Wall (LEFT COVER!)
		gm.utility.createWorldObject(1861, 317.4881 + 3.29, 		-55.12 + 1.91, 	73.0, 0, 90 , 180);
		gm.utility.createWorldObject(1861, 317.4881 + 3.29 + 3.02, -55.12 + 1.91, 	73.0, 0, 90 , 180);
		gm.utility.createWorldObject(1861, 317.4881 + 3.29 + 6.02, -55.12 + 1.91, 	73.0, 0, 90 , 180);
	
		// Wall (RIGHT!)
		gm.utility.createWorldObject(1895, 317.4881 + 5, 	-55.12 - 7.7, 70, 0, 0 , 90);
		gm.utility.createWorldObject(1895, 317.4881 + 5, 	-55.12 - 7.7, 73.5, 0, 0 , 90);

		// Wall (RIGHT COVER!)
		gm.utility.createWorldObject(1861, 317.4881 + 2.59, 		-55.12 - 6.6, 	73.0, 0, 90 , 0);
		gm.utility.createWorldObject(1861, 317.4881 + 2.59 + 3.02, -55.12 - 6.6, 	73.0, 0, 90 , 0);
		gm.utility.createWorldObject(1861, 317.4881 + 2.59 + 6.02, -55.12 - 6.6, 	73.0, 0, 90 , 0);

		/*** Furniture ***/

		//gm.utility.createWorldObject(6793, 318, -57.5, 77, 0, 90 , 0) -- Door
		//gm.utility.createWorldObject(6793, 324, -57.5, 77, 0, 90 , 0) -- Door
	
		gm.utility.createWorldObject(9801, 325.5186, -55.6462, 71.8052, 0, 0 , -25); // Chair (Red)
		gm.utility.createWorldObject(9806, 325.4297, -56.8049, 71.8052, 0, 0 , 0); // Table
		gm.utility.createWorldObject(9852, 325.4297, -56.8049, 72.54, 0, 0 , 57); // Bottle
		gm.utility.createWorldObject(9804, 324.5186, -56.9462, 71.8052, 0, 0 , 100); // Chair (Green)
		gm.utility.createWorldObject(9801, 326.5351, -57.0817, 71.8052, 0, 0 , -95); // Chair (Red)
		gm.utility.createWorldObject(9801, 325.3796, -57.7461, 71.8052, 0, 0 , 195); // Chair (Red)

		gm.utility.createWorldObject(9863, 327.2510, -60.8160, 71.8052, 0, 0 , 0); // Soda Machine
		gm.utility.createWorldObject(9813, 326.1379, -60.7944, 71.8052, 0, 0 , 0); // Trashcan
		gm.utility.createWorldObject(9866, 324.3975, -60.2044, 73.5, 0, 0 , 0); // Christmas Tree
		gm.utility.createWorldObject(9867, 324.3975, -60.2044, 73.5, 0, 0 , 0); // Christmas Tree Lights
		gm.utility.createWorldObject(9807, 327.3151, -54.2354, 71.8052, 0, 0 , 0); // Plant
	
		gm.utility.createWorldObject(5334, 317.4881 + 10.39, 	-55.19 - 0.31, 73.5, 0, 0 , 0); // Poster (Bike)
	
		gm.utility.createWorldObject(9814, 317.4881 + 9.8, 	-58.5972, 71.8052, 0, 0 , 0); // Crates(x3)
		gm.utility.createWorldObject(9826, 322.3177, 			-57.9489, 72.25, 0, 0 , 90); // Table
		gm.utility.createWorldObject(9857, 322.3177, 			-57.9489, 72.59, 0, 0 , 72); // Bottle
		gm.utility.createWorldObject(1894, 322.6384, 			-59.6379, 72.3, 0, 0 , 270); // Couch
		gm.utility.createWorldObject(9833, 319.3593, 			-59.3749, 73.1, 0, 0 , 90); // TV
		gm.utility.createWorldObject(9820, 319.3593, 			-60.28, 72.87, 0, 0 , 90); // Lamp
		gm.utility.createWorldObject(9838, 319.3593, 			-58.6, 73, 0, 0 , 90); // Jar
		gm.utility.createWorldObject(9819, 319.3593, 			-59.3749, 71.8, 0, 0 , 90); // Table
	
		gm.utility.createWorldObject(1877, 323.1206, 			-57.2933, 75.5, 0, 0 , 0); // Ceiling Light
		gm.utility.createWorldObject(10845, 323.1206, 			-57.2933, 75.5, 0, 0 , 0); // Ceiling Light
	
		gm.utility.createWorldObject(9818, 322.9789, 			-54.3526, 72.55, 0, 0 , 0); // Aquarium
		gm.utility.createWorldObject(9850, 322.9789, 			-54.3526, 72.55, 0, 0 , 0);  // Table

		/*
			-- 1097, iJockEnt, iJockScreen, 1, 15, 8192, 0, 1, 0, 255, 0, 0, 0
			-- 1098, DL_iJockScreenD, iJockScreen, 1, 14, 0, 0, 1, 0, 255, 0, 0, 0, 7, 19
			-- 1099, DL_iJockScreenN, iJockScreen, 1, 14, 0, 0, 1, 0, 255, 0, 0, 0, 19, 7
				
			-- 1100, FGRD_ND_iJockOP, FGRD_ND_iJock, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1101, NOGO_iJockSOP, NOGO_iJockS, 1, 100, 128, 0, 1, 0, 255, 0, 0, 0
			-- 1102, WALKABLE_iJockSOP, NOGO_iJockS, 1, 100, 128, 0, 1, 0, 255, 0, 0, 0

			-- , Jock_Pipes, Jock_Pipes, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1081, Jock_RoomDetails05, Jock_RoomDetails, 1, 100, 4, 0, 1, 0, 255, 0, 0, 0
			-- 1082, Jock_RoomDetails07, Jock_RoomDetails, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1083, Jock_RoomDetails08, Jock_RoomDetails, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1084, Jock_RoomDetails09, Jock_RoomDetails, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1085, Jock_RoomDetails01, Jock_RoomDetails, 1, 100, 4224, 0, 1, 0, 255, 0, 0, 0
			-- 1086, Jock_RoomDetails06, Jock_RoomDetails, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1087, Jock_RoomDetails04, Jock_RoomDetails, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1088, Jock_RoomDetails10, Jock_RoomDetails, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1089, Jock_RoomDetails02, Jock_RoomDetails, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1090, Jock_RoomDetails03, Jock_RoomDetails, 1, 100, 0, 0, 1, 0, 255, 0, 0, 0
			-- 1093, Jock_Additive, Jock_Additive, 1, 100, 12, 0, 1, 0, 255, 0, 0, 0
			-- 1094, Jock_Additive_A, Jock_Additive, 1, 100, 12, 0, 1, 0, 255, 0, 0, 0
			-- 1095, Jock_Additive_B, Jock_Additive_B, 1, 100, 12, 0, 1, 0, 255, 0, 0, 0
		*/
	
	
		gm.utility.createWorldObject(1076, 320.2132, 			-55.7279, 107.10001, 0, 0 , 0); // Interior
		gm.utility.createWorldObject(1077, 320.2132, 			-55.7279 - 0.35, 106.72501, 0, 0 , 0); // Posters
		gm.utility.createWorldObject(1078, 320.2132, 			-55.7279, 105.75001, 0, 0 , 0); // Furniture
		gm.utility.createWorldObject(1091, 320.2132, 			-55.7279, 106.44001, 0, 0 , 0); // Blinds
		gm.utility.createWorldObject(1092, 320.2132, 			-55.7279, 109.10001, 0, 0 , 0); // Lights
		gm.utility.createWorldObject(1096, 320.2132, 			-55.7279, 107.10001, 0, 0 , 0); // BlackBox
		gm.utility.createWorldObject(1080, 320.2132, 			-55.7279, 107.10001, 0, 0 , 0); // Pipes
		gm.utility.createWorldObject(1102, 320.2132, 			-55.7279, 107.10001, 0, 0 , 0); // gey
		gm.utility.createWorldObject(1101, 320.2132, 			-55.7279, 107.10001, 0, 0 , 0); // gey


		gm.utility.createWorldObject(1864, 317.4881, -55.1934 + 5, 102.60001, 0, 0 , 90);
		gm.utility.createWorldObject(1864, 317.4881, -55.1934 + 2.5, 102.60001, 0, 0 , 90);
		gm.utility.createWorldObject(1864, 317.4881, -55.1934, 102.60001, 0, 0 , 90);
		gm.utility.createWorldObject(1864, 317.4881, -55.1934 - 2.5, 102.60001, 0, 0 , 90);
		gm.utility.createWorldObject(1864, 317.4881, -55.1934 - 5, 102.60001, 0, 0 , 90);
		gm.utility.createWorldObject(1864, 317.4881, -55.1934 - 6.5, 102.60001, 0, 0 , 90);
		gm.utility.createWorldObject(1864, 317.4881 + 8, -55.1934, 102.60001, 0, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 8, -55.1934 - 1.5, 102.60001, 0, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 10, -55.1934, 102.60001, 0, 0 , 0);
		gm.utility.createWorldObject(1864, 317.4881 + 10, -55.1934 - 1.5, 102.60001, 0, 0 , 0);


		//gm.utility.createWorldObject(1864, 317.4881 + 15, -55.1934 + 5, 82.60001, 0, 0 , 0)
		//gm.utility.createWorldObject(1864, 317.4881 + 15, -55.1934 - 5, 82.60001, 0, 0 , 0)
	}
}
