"use strict";

function Prop( pos, image )
{
	this.position = pos.Clone();
	this.image = image;

	this.updateBounds();
}

Prop.prototype.size = new Vec2(64, 64);

Prop.prototype.draw =
	function( canvas )
	{
		canvas.save();
		canvas.translate(Game.worldToCanvas(this.position));

		canvas.drawImage(this.image, Game.worldToCanvas(this.size.Muls(0.5).negate()), Game.worldToCanvas(this.size));
		canvas.restore();
	};

Prop.prototype.updateBounds =
	function()
	{
		this.bounds = new OBB(this.position, this.size, 0);
	};
