/**
 * Created by Ed on 21/04/2014.
 */
function ControlInterfaceAI( entity )
{
	this.entity = entity;
	this.game = entity.game;
}

ControlInterfaceAI.prototype.update =
	function( game )
	{

	};

ControlInterfaceAI.prototype.getMovementDirection =
	function()
	{
		var movementDirection = new Vec2(0, 0);

		return movementDirection;
	};

ControlInterfaceAI.prototype.getTurretDirection =
	function()
	{
		return new Vec2(-1, 0);
	};

ControlInterfaceAI.prototype.isTryingToFire =
	function()
	{
		return false;
	};
