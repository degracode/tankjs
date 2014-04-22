/**
 * Created by Ed on 22/04/2014.
 */
function OBB(centre, size, rotation)
{
	this.centre = centre;
	this.size = size;
	this.rotation = rotation;
}

OBB.prototype.rotate =
	function(angle)
	{
		this.rotation = (this.rotation + angle) % Math.TwoPi;
	}

OBB.prototype.getLeft = function() { return this.centre.x - (this.size.x / 2); };
OBB.prototype.getRight = function() { return this.centre.x + (this.size.x / 2); };
OBB.prototype.getTop = function() { return this.centre.y - (this.size.y / 2); };
OBB.prototype.getBottom = function() { return this.centre.y + (this.size.y / 2); };