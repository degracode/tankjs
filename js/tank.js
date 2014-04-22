function Tank( vecPos, screen, bodyGraphic, turretGraphic )
{
	this.screen = screen;

	this.position = vecPos.Clone();
	this.rotation = 0;
	this.turretRotation = 0;
	this.size = new Vec2(32, 32);

	this.leftTrackEffect = new TrailEffect();
	this.leftTrackEffect.numSegments = 0;
	this.screen.trackEffects.push(this.leftTrackEffect);

	this.rightTrackEffect = new TrailEffect();
	this.rightTrackEffect.numSegments = 0;
	this.screen.trackEffects.push(this.rightTrackEffect);

	this.bodyGraphic = bodyGraphic;
	this.turretGraphic = turretGraphic;

	this.updateBounds();
}

Tank.prototype.update =
	function()
	{
		this.controlInterface.update();

		var movementDirection = this.controlInterface.getMovementDirection();

		if(!movementDirection.isZero())
		{
			movementDirection.normalise();

			var targetRotation = Math.atan2(movementDirection.y, movementDirection.x);
			this.rotation = Math.angleLerp(this.rotation, targetRotation, 0.2);
		}

		this.position.addv(movementDirection);
		this.updateBounds();

		this.applyConstraints();
		this.updateBounds();

		var turretDirection = this.controlInterface.getTurretDirection();
		this.turretRotation = Math.atan2(turretDirection.y, turretDirection.x);

		if(this.controlInterface.isTryingToFire())
		{
			var turretEnd = turretDirection.ScaleToLength(32).addv(this.position);
			this.screen.addEntity(new Shell(turretEnd, turretDirection, this.screen.game.assets.shell, this.screen));
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
		canvas.translate(this.position.x, this.position.y);

		canvas.save();
		canvas.rotate(this.rotation);
		canvas.drawImage(this.bodyGraphic, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
		canvas.restore();

		canvas.rotate(this.turretRotation);
		canvas.drawImage(this.turretGraphic, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);

		canvas.restore();
	};

Tank.prototype.applyConstraints =
	function()
	{
		for(var entityId in this.screen.entities)
		{
			var entity = this.screen.entities[entityId];
			if(entity.bounds && entity != this)
			{
				var contact = this.bounds.testCollision(entity.bounds);
				if(contact.hit)
				{
					this.position.addv(contact.penetration);
					this.updateBounds();
				}
			}
		}
	};

Tank.prototype.updateBounds =
	function()
	{
		this.bounds = new AABB(this.position, this.size, 0);
	};

Tank.prototype.destroy =
	function()
	{
		if(this.team)
			this.team.removeMember(this);
		this.screen.removeEntity(this.id);
	};

Tank.prototype.team = null;
