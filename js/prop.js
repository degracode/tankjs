"use strict";

function Prop( screen, pos, image )
{
	this.screen = screen;

	this.position = pos.Clone();
	this.image = image;

	this.updateBounds();
}

Prop.prototype.size = new Vec2(64, 64);

Prop.prototype.draw =
	function( canvas )
	{
		canvas.save();
		canvas.translate(this.screen.game.worldToCanvas(this.position));

		canvas.drawImage(this.image, this.screen.game.worldToCanvas(this.size.Muls(0.5).negate()), this.screen.game.worldToCanvas(this.size));
		canvas.restore();
	};

Prop.prototype.updateBounds =
	function()
	{
		this.bounds = new OBB(this.position, this.size, 0);
	};
