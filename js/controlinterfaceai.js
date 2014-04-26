"use strict";

/**
 * Created by Ed on 21/04/2014.
 */
function ControlInterfaceAI( entity )
{
	this.entity = entity;
	this.screen = entity.screen;

	this.targetPosition = null;
	this.targetTurretRotation = 0;
}

ControlInterfaceAI.prototype.update =
	function()
	{
		if(this.targetPosition && this.entity.position.DistanceTo(this.targetPosition) < 30)
			this.targetPosition = null;

		if(!this.targetPosition)
		{
			var randomDirection = Math.random() * Math.TwoPi;
			randomDirection = new Vec2(Math.cos(randomDirection), Math.sin(randomDirection));

			var rayResult = this.screen.rayTest(this.entity.position, randomDirection, this.entity);
			if(rayResult.hit && rayResult.distance > 100)
			{
				var distanceToTravel = Math.lerp(100, rayResult.distance, Math.random());
				this.targetPosition = randomDirection.Muls(distanceToTravel).addv(this.entity.position);
			}
		}

		if(Math.isWithinEpsilon(this.targetTurretRotation, this.entity.turretRotation, Math.Pi / 180))
		{
			this.targetTurretRotation = Math.random() * Math.TwoPi;
		}
	};

ControlInterfaceAI.prototype.getMovementDirection =
	function()
	{
		if(this.targetPosition)
		{
			return this.entity.position.DirectionTo(this.targetPosition);
		}
		return new Vec2(0,0);
	};

ControlInterfaceAI.prototype.getTurretDirection =
	function()
	{
		var newRotation = Math.angleLerpFixedSpeed(this.entity.turretRotation, this.targetTurretRotation, Math.Pi / 180);
		var direction = new Vec2(Math.cos(newRotation), Math.sin(newRotation));
		return [direction, newRotation];
	};

ControlInterfaceAI.prototype.isTryingToFire =
	function()
	{
		return false;
	};
