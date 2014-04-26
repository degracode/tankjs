/**
 * Created by Ed on 26/04/2014.
 */
var levelData = [];

function Level(playerStartPos, width, height, features)
{
	this.playerStartPos = playerStartPos;
	this.width = width;
	this.height = height;
	this.features = features;
}

levelData.push(new Level(new Vec2(128, 128), 640, 512,
	[
		{"type": "block", "position": new Vec2(416, 224)},
		{"type": "block", "position": new Vec2(352, 224)},
		{"type": "block", "position": new Vec2(288, 224)},
		{"type": "block", "position": new Vec2(288, 288)},
		{"type": "block", "position": new Vec2(288, 352)},

		{"type": "tank", "position": new Vec2(400, 300)}
	]
));