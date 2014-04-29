"use strict";

function Shell( screen, pos, dir, image )
{
	Prop.call(this, screen, pos, image);

	this.numBouncesRemaining = constants.numShellBounces;
	this.direction = dir.Clone();
}

Shell.prototype = new Prop(null, new Vec2(0, 0), null);
Shell.constuctor = Shell;
Shell.prototype.size = new Vec2(constants.shellSize, constants.shellSize);

Shell.prototype.update =
	function()
	{
		this.position.addv(this.direction.Muls(constants.shellSpeed));
		this.updateBounds();

		for(var entityId in this.screen.entities)
		{
			var entity = this.screen.entities[entityId];
			if(entity.bounds && entity != this)
			{
				var contact = this.bounds.testCollision(entity.bounds);
				if(contact.hit)
				{
					if(entity instanceof Tank || entity instanceof Shell || (entity instanceof Prop && entity.destroyable))
					{
						this.destroy();
						entity.destroy();
						return;
					}
					else
					{
						var horzMagnitude = Math.abs(contact.mvt.x);
						var vertMagnitude = Math.abs(contact.mvt.y);

						var doneBounce = false;

						if(horzMagnitude!=0 && Math.sign(contact.mvt.x)==Math.sign(this.direction.x))
						{
							this.direction.x *= -1;
							doneBounce = true;
						}

						if(vertMagnitude!=0 && Math.sign(contact.mvt.y)==Math.sign(this.direction.y))
						{
							this.direction.y *= -1;
							doneBounce = true;
						}

						if(doneBounce)
							--this.numBouncesRemaining;
						
						if(this.numBouncesRemaining < 0)
						{
							this.destroy();
							return;
						}
						
						this.updateBounds();
					}
				}
			}
		}
	};
