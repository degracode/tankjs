"use strict";

function Shell( pos, dir, image, screen )
{
	this.screen = screen;

	Prop.call(this, pos, image);

	this.numBouncesRemaining = 3;
	this.direction = dir.Clone();
}

Shell.prototype = new Prop(new Vec2(0, 0), null);
Shell.constuctor = Shell;
Shell.prototype.size = new Vec2(16, 16);

Shell.prototype.update =
	function()
	{
		this.position.addv(this.direction);
		this.updateBounds();

		for(var entityId in this.screen.entities)
		{
			var entity = this.screen.entities[entityId];
			if(entity.bounds && entity != this)
			{
				var contact = this.bounds.testCollision(entity.bounds);
				if(contact.hit)
				{
					if(entity instanceof Tank || entity instanceof Shell)
					{
						this.destroy();
						entity.destroy();
						return;
					}
					else
					{
						var horzMagnitude = Math.abs(contact.mvt.x);
						var vertMagnitude = Math.abs(contact.mvt.y);
						if(horzMagnitude!=0 && Math.sign(contact.mvt.x)==Math.sign(this.direction.x))
						{
							this.direction.x *= -1;
							--this.numBouncesRemaining;
						}

						if(vertMagnitude!=0 && Math.sign(contact.mvt.y)==Math.sign(this.direction.y))
						{
							this.direction.y *= -1;
							--this.numBouncesRemaining;
						}

						if(this.numBouncesRemaining<=0)
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

Shell.prototype.destroy =
	function()
	{
		this.screen.removeEntity(this.id);
	};
