/**
 * Created by Ed on 26/04/2014.
 */
var levelData = [];

function Level(playerStartPos, features)
{
	this.playerStartPos = playerStartPos;
	this.features = features;
}

levelData.push(new Level(new Vec2(128, 128),
	[
		{"type": "block", "position": new Vec2(10*64+32, 3*64+32)},
		{"type": "block", "position": new Vec2(10*64+32, 4*64+32)},

		{"type": "tank", "position": new Vec2(12*64, 4*64)}
	]
));


levelData.push(new Level(new Vec2(4*64, 4*64),
	[
		{"type": "block", "position": new Vec2(10.5*64, 1.5*64)},
		{"type": "block", "position": new Vec2(10.5*64, 2.5*64)},

		{"type": "destroyableblock", "position": new Vec2(10.25*64, 3.25*64)},
		{"type": "destroyableblock", "position": new Vec2(10.25*64, 3.75*64)},
		{"type": "destroyableblock", "position": new Vec2(10.25*64, 4.25*64)},
		{"type": "destroyableblock", "position": new Vec2(10.25*64, 4.75*64)},
		{"type": "destroyableblock", "position": new Vec2(10.75*64, 3.25*64)},
		{"type": "destroyableblock", "position": new Vec2(10.75*64, 3.75*64)},
		{"type": "destroyableblock", "position": new Vec2(10.75*64, 4.25*64)},
		{"type": "destroyableblock", "position": new Vec2(10.75*64, 4.75*64)},

		{"type": "block", "position": new Vec2(10.5*64, 5.5*64)},
		{"type": "block", "position": new Vec2(10.5*64, 6.5*64)},

		{"type": "tank", "position": new Vec2(12*64, 4*64)}
	]
));


levelData.push(new Level(new Vec2(3*64, 2*64),
	[
		{"type": "block", "position": new Vec2(5.5*64, 1.5*64)},
		{"type": "block", "position": new Vec2(5.5*64, 2.5*64)},
		{"type": "block", "position": new Vec2(5.5*64, 3.5*64)},
		{"type": "block", "position": new Vec2(5.5*64, 4.5*64)},
		{"type": "block", "position": new Vec2(5.5*64, 5.5*64)},

		{"type": "block", "position": new Vec2(10.5*64, 2.5*64)},
		{"type": "block", "position": new Vec2(10.5*64, 3.5*64)},
		{"type": "block", "position": new Vec2(10.5*64, 4.5*64)},
		{"type": "block", "position": new Vec2(10.5*64, 5.5*64)},
		{"type": "block", "position": new Vec2(10.5*64, 6.5*64)},

		{"type": "tank", "position": new Vec2(8*64, 4*64)},
		{"type": "tank", "position": new Vec2(13*64, 6*64)}
	]
));