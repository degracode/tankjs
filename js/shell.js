function Shell( pos, dir, image )
{
	Prop.call(this, pos, image);

	this.direction = dir.Clone();
}

Shell.prototype = new Prop(new Vec2(0, 0), null);
Shell.constuctor = Shell;
Shell.prototype.size = new Vec2(16, 16);

Shell.prototype.update =
	function( game )
	{
		this.position.addv(this.direction);
		this.updateBounds();

		for(var entityId in game.entities)
		{
			var entity = game.entities[entityId];
			if(entity.bounds && entity != this)
			{
				var horzOverlap = Math.calculateRangeOverlap(this.bounds.left, this.bounds.right, entity.bounds.left, entity.bounds.right);
				var vertOverlap = Math.calculateRangeOverlap(this.bounds.top, this.bounds.bottom, entity.bounds.top, entity.bounds.bottom);
				if(horzOverlap != 0 && vertOverlap != 0)
				{
					if(entity instanceof Tank)
					{
						game.removeEntity(this.id);
						return;
					}
					else
					{
						var horzMagnitude = Math.abs(horzOverlap);
						var vertMagnitude = Math.abs(vertOverlap);
						if(horzMagnitude!=0 && horzMagnitude < vertMagnitude && Math.sign(-horzOverlap)==Math.sign(this.direction.x))
						{
							this.direction.x *= -1;
						}

						if(vertMagnitude!=0 && vertMagnitude < horzMagnitude && Math.sign(-vertOverlap)==Math.sign(this.direction.y))
						{
							this.direction.y *= -1;
						}
					}
				}
			}
		}
	};

