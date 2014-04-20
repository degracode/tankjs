function ControlInterfacePlayer( entity )
{
	this.entity = entity;
	this.game = entity.game;
}

ControlInterfacePlayer.prototype.update =
	function( game )
	{

	};

ControlInterfacePlayer.prototype.getMovementDirection =
	function()
	{
		var movementDirection = new Vec2(0, 0);

		var key = this.game.key;
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
		var direction = this.game.mouse.position.Subv(this.entity.position);
		return direction.normalise();
	};

ControlInterfacePlayer.prototype.isTryingToFire =
	function()
	{
		var mouse = this.game.mouse;
		var isPressing = mouse.isDown(mouse.LEFT);
		if(isPressing)
		{
			this.game.mouse.debounce(mouse.LEFT);
			return true;
		}
		return false;
	};
