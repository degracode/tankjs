function Shell( pos, dir, image )
{
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

		for(var entityId in this.game.entities)
		{
			var entity = this.game.entities[entityId];
			if(entity.bounds && entity != this)
			{
				var horzOverlap = Math.calculateRangeOverlap(this.bounds.left, this.bounds.right, entity.bounds.left, entity.bounds.right);
				var vertOverlap = Math.calculateRangeOverlap(this.bounds.top, this.bounds.bottom, entity.bounds.top, entity.bounds.bottom);
				if(horzOverlap != 0 && vertOverlap != 0)
				{
					if(entity instanceof Tank || entity instanceof Shell)
					{
						this.destroy();
						entity.destroy();
						return;
					}
					else
					{
						var horzMagnitude = Math.abs(horzOverlap);
						var vertMagnitude = Math.abs(vertOverlap);
						if(horzMagnitude!=0 && horzMagnitude < vertMagnitude && Math.sign(-horzOverlap)==Math.sign(this.direction.x))
						{
							this.direction.x *= -1;
							--this.numBouncesRemaining;
						}

						if(vertMagnitude!=0 && vertMagnitude < horzMagnitude && Math.sign(-vertOverlap)==Math.sign(this.direction.y))
						{
							this.direction.y *= -1;
							--this.numBouncesRemaining;
						}

						if(this.numBouncesRemaining<=0)
						{
							this.destroy();
							return;
						}
					}
				}
			}
		}
	};

Shell.prototype.destroy =
	function()
	{
		this.game.removeEntity(this.id);
	};