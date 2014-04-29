"use strict";

function Tank( screen, vecPos, bodyGraphic, turretGraphic )
{
	this.screen = screen;

	this.position = vecPos.Clone();
	this.rotation = 0;
	this.turretRotation = 0;
	this.turretDirection = new Vec2(0, 1);
	this.size = new Vec2(32, 32);

	this.leftTrackEffect = new TrailEffect(this.screen);
	this.leftTrackEffect.numSegments = 0;
	this.screen.trackEffects.push(this.leftTrackEffect);

	this.rightTrackEffect = new TrailEffect(this.screen);
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
			this.rotation = Math.angleLerpFixedSpeed(this.rotation, targetRotation, constants.tankRotationSpeed);

			var forwardDirection = new Vec2(Math.cos(this.rotation), Math.sin(this.rotation));

			var forwardDot = movementDirection.Dot(forwardDirection);
			if(forwardDot > constants.tankRotationAlignmentThreshold)
			{
				this.position.addv(movementDirection.muls(constants.tankSpeed));
			}
		}

		this.updateBounds();

		this.applyConstraints();
		this.updateBounds();

		var turretDirectionResult = this.controlInterface.getTurretDirection();
		this.turretDirection = turretDirectionResult[0];
		this.turretRotation = turretDirectionResult[1];

		if(this.controlInterface.isTryingToFire())
		{
			var turretEnd = this.turretDirection.ScaleToLength(32).addv(this.position);
			this.screen.addEntity(new Shell(this.screen, turretEnd, this.turretDirection, this.screen.game.assets.shell));
		}

		var forwardDirection = new Vec2(Math.cos(this.rotation), Math.sin(this.rotation));
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
		var rayTest = this.screen.rayTest(this.position, this.turretDirection, this);
		if(rayTest.hit)
		{
			canvas.beginPath();
			canvas.moveTo(this.screen.game.worldToCanvas(this.position));
			canvas.lineTo(this.screen.game.worldToCanvas(rayTest.position));
			canvas.getCanvas().lineWidth = this.screen.game.worldToCanvas(5);
			canvas.getCanvas().strokeStyle = 'rgb(0, 255, 0)';
			canvas.getCanvas().globalAlpha = 0.5;
			canvas.setLineDash([this.screen.game.worldToCanvas(5),this.screen.game.worldToCanvas(5)]);
			canvas.stroke();
		}
		canvas.restore();

		canvas.save();
		canvas.translate(this.screen.game.worldToCanvas(this.position));

		canvas.save();
		canvas.rotate(this.rotation);
		canvas.drawImage(this.bodyGraphic, this.screen.game.worldToCanvas(this.size.Muls(0.5).negate()), this.screen.game.worldToCanvas(this.size));
		canvas.restore();

		canvas.rotate(this.turretRotation);
		canvas.drawImage(this.turretGraphic, this.screen.game.worldToCanvas(this.size.Muls(0.5).negate()), this.screen.game.worldToCanvas(this.size));

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
					this.position.subv(contact.mvt);
					this.updateBounds();
				}
			}
		}
	};

Tank.prototype.updateBounds =
	function()
	{
		this.bounds = new OBB(this.position, this.size, this.rotation);
	};

Tank.prototype.destroy =
	function()
	{
		if(this.team)
			this.team.removeMember(this);
		this.screen.removeEntity(this.id);
	};

Tank.prototype.team = null;
