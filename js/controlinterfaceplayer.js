"use strict";

function ControlInterfacePlayer( entity )
{
	this.entity = entity;
	this.screen = entity.screen;
}

ControlInterfacePlayer.prototype.update =
	function()
	{

	};

ControlInterfacePlayer.prototype.getMovementDirection =
	function()
	{
		var movementDirection = new Vec2(0, 0);

		var key = this.screen.game.key;
		if(key.isDown(key.UP) || key.isDown(key.W))
			movementDirection.y += -1;
		if(key.isDown(key.DOWN) || key.isDown(key.S))
			movementDirection.y += 1;
		if(key.isDown(key.LEFT) || key.isDown(key.A))
			movementDirection.x += -1;
		if(key.isDown(key.RIGHT) || key.isDown(key.D))
			movementDirection.x += 1;

		return movementDirection;
	};

ControlInterfacePlayer.prototype.getTurretDirection =
	function()
	{
		var worldSpaceCursor = this.screen.game.canvasToWorld(this.screen.game.mouse.position);
		var direction = worldSpaceCursor.Subv(this.entity.position);

		var rotation = Math.atan2(direction.y, direction.x);
		return [direction.normalise(), rotation];
	};

ControlInterfacePlayer.prototype.isTryingToFire =
	function()
	{
		var mouse = this.screen.game.mouse;
		var isPressing = mouse.isDown(mouse.LEFT);
		if(isPressing)
		{
			mouse.debounce(mouse.LEFT);
			return true;
		}
		return false;
	};
