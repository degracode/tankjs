function Tank(vecPos)
{
	this.position = vecPos.Clone();
	this.rotation = 0;
	this.turretRotation = 0;
	this.size = new Vec2(32, 32);
	
	this.updateBounds();
}

Tank.prototype.update =
function(game)
{
	var movementDirection = new Vec2(0,0);
	
	if(game.key.isDown(Game.key.UP) || game.key.isDown(Game.key.W))
		movementDirection.y += -1;
	if(game.key.isDown(Game.key.DOWN) || game.key.isDown(Game.key.S))
		movementDirection.y += 1;
	if(game.key.isDown(Game.key.LEFT) || game.key.isDown(Game.key.A))
		movementDirection.x += -1;
	if(game.key.isDown(Game.key.RIGHT) || game.key.isDown(Game.key.D))
		movementDirection.x += 1;
	
	if(!movementDirection.IsZero())
	{
		movementDirection.normalise();
		
		var targetRotation = Math.atan2(movementDirection.y, movementDirection.x);
		this.rotation = Math.angleLerp(this.rotation, targetRotation, 0.2);
	}
	
	this.position.addv(movementDirection);
	this.updateBounds();
	
	this.applyConstraints(game);
	this.updateBounds();
	
	var direction = game.mouse.position.Subv(this.position);	
	this.turretRotation = Math.atan2(direction.y, direction.x);
}
						
Tank.prototype.draw =
function(game, canvas)
{
	canvas.save();
	canvas.translate(this.position.x, this.position.y);
	
	canvas.save();
	canvas.rotate(this.rotation);
	canvas.drawImage(game.assets.tank_body, -this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
	canvas.restore();
	
	canvas.rotate(this.turretRotation);
	canvas.drawImage(game.assets.tank_turret, -this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
	
	canvas.restore();
}

Tank.prototype.applyConstraints =
function(game)
{
	for(var entityId in game.entities)
	{
		var entity = game.entities[entityId];
		if(entity.bounds && entity!=this)
		{
			var horzOverlap = Math.calculateRangeOverlap(this.bounds.left, this.bounds.right, entity.bounds.left, entity.bounds.right);
			var vertOverlap = Math.calculateRangeOverlap(this.bounds.top, this.bounds.bottom, entity.bounds.top, entity.bounds.bottom);
			if(horzOverlap!=0 && vertOverlap!=0)
			{
				if(Math.abs(horzOverlap) < Math.abs(vertOverlap))
					this.position.x += horzOverlap;
				else
					this.position.y += vertOverlap;
				this.updateBounds();
			}
		}
	}
};

Tank.prototype.updateBounds =
function()
{
	this.bounds = {};
	this.bounds.left = this.position.x - (this.size.x / 2);
	this.bounds.right = this.position.x + (this.size.x / 2);
	this.bounds.top = this.position.y - (this.size.y / 2);
	this.bounds.bottom = this.position.y + (this.size.y / 2);
};
