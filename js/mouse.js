function Mouse( context )
{
	this._pressed = {};
	this.position = new Vec2(0, 0);
	this.context = context;

	var scope = this;

	this.onMouseDown = function( event )
	{
		scope._pressed[event.button] = true;
	};

	this.onMouseUp = function( event )
	{
		try
		{
			delete scope._pressed[event.button];
		}
		catch(err)
		{
		}
	};

	this.onMouseMove = function( event )
	{
		var rect = scope.context.getBoundingClientRect();
		scope.position = new Vec2(event.x - rect.left, event.y - rect.top);
	};

	context.addEventListener('mousedown', this.onMouseDown, false);
	context.addEventListener('mouseup', this.onMouseUp, false);
	context.addEventListener('mousemove', this.onMouseMove, false);
}

Mouse.prototype.LEFT = 0;
Mouse.prototype.RIGHT = 2;

Mouse.prototype.isDown =
	function( keyCode )
	{
		return this._pressed[keyCode];
	};

Mouse.prototype.debounce =
	function( button )
	{
		try
		{
			delete this._pressed[button];
		}
		catch(err)
		{
		}
	};