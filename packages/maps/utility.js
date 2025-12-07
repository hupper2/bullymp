'use strict';

module.exports = class Startup {
	static createWorldObject(modelId, posX, posY, posZ, rotX, rotY, rotZ) {
		new WorldObject(modelId, new Vector3(posX, posY, posZ), new Vector3(rotX, rotY, rotZ));
	}
}
