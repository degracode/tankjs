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
	};

