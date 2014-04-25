"use strict";

function Key()
{
	this._pressed = {};

	var scope = this;
	window.addEventListener('keyup', function( event )
	{
		delete scope._pressed[event.keyCode];
	}, false);
	window.addEventListener('keydown', function( event )
	{
		scope._pressed[event.keyCode] = true;
	}, false);
}

Key.prototype.LEFT = 37;
Key.prototype.UP = 38;
Key.prototype.RIGHT = 39;
Key.prototype.DOWN = 40;
Key.prototype.W = 87;
Key.prototype.A = 65;
Key.prototype.S = 83;
Key.prototype.D = 68;

Key.prototype.isDown =
	function( keyCode )
	{
		return this._pressed[keyCode];
	};
	