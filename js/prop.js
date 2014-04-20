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
		canvas.translate(this.position.x, this.position.y);

		canvas.drawImage(this.image, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
		canvas.restore();
	};

Prop.prototype.updateBounds =
	function()
	{
		this.bounds = {};
		this.bounds.left = this.position.x - (this.size.x / 2);
		this.bounds.right = this.position.x + (this.size.x / 2);
		this.bounds.top = this.position.y - (this.size.y / 2);
		this.bounds.bottom = this.position.y + (this.size.y / 2);
	};
