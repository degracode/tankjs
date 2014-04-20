function Tank( vecPos )
{
	this.position = vecPos.Clone();
	this.rotation = 0;
	this.turretRotation = 0;
	this.size = new Vec2(32, 32);

	this.leftTrackEffect = new TrailEffect();
	this.leftTrackEffect.numSegments = 0;

	this.rightTrackEffect = new TrailEffect();
	this.rightTrackEffect.numSegments = 0;

	this.updateBounds();
}

Tank.prototype.update =
	function()
	{
		this.controlInterface.update(this.game);

		var movementDirection = this.controlInterface.getMovementDirection();

		if(!movementDirection.isZero())
		{
			movementDirection.normalise();

			var targetRotation = Math.atan2(movementDirection.y, movementDirection.x);
			this.rotation = Math.angleLerp(this.rotation, targetRotation, 0.2);
		}

		this.position.addv(movementDirection);
		this.updateBounds();

		this.applyConstraints(this.game);
		this.updateBounds();

		var turretDirection = this.controlInterface.getTurretDirection();
		this.turretRotation = Math.atan2(turretDirection.y, turretDirection.x);

		if(this.controlInterface.isTryingToFire())
		{
			var turretEnd = turretDirection.ScaleToLength(32).addv(this.position);
			this.game.addEntity(new Shell(turretEnd, turretDirection, this.game.assets.shell));
		}

		var forwardDirection = (new Vec2(Math.cos(this.rotation), Math.sin(this.rotation)));
		var sidewaysDirection = (new Vec2(forwardDirection.y, -forwardDirection.x)).muls(10);
		forwardDirection.muls(-10);
		var frontBumperCentre = forwardDirection.Addv(this.position);
		this.leftTrackEffect.addPoint(frontBumperCentre.Addv(sidewaysDirection));
		this.rightTrackEffect.addPoint(frontBumperCentre.Subv(sidewaysDirection));
	};

Tank.prototype.draw =
	function( canvas )
	{
		canvas.save();

		this.leftTrackEffect.draw(canvas);
		this.rightTrackEffect.draw(canvas);

		canvas.translate(this.position.x, this.position.y);

		canvas.save();
		canvas.rotate(this.rotation);
		canvas.drawImage(this.game.assets.tank_body, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
		canvas.restore();

		canvas.rotate(this.turretRotation);
		canvas.drawImage(this.game.assets.tank_turret, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);

		canvas.restore();
	};

Tank.prototype.applyConstraints =
	function()
	{
		for(var entityId in this.game.entities)
		{
			var entity = this.game.entities[entityId];
			if(entity.bounds && entity != this)
			{
				var horzOverlap = Math.calculateRangeOverlap(this.bounds.left, this.bounds.right, entity.bounds.left, entity.bounds.right);
				var vertOverlap = Math.calculateRangeOverlap(this.bounds.top, this.bounds.bottom, entity.bounds.top, entity.bounds.bottom);
				if(horzOverlap != 0 && vertOverlap != 0)
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
