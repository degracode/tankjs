/**
 * Created by Ed on 22/04/2014.
 */
function AABB(centre, size)
{
	this.centre = centre;
	this.size = size;
}

AABB.prototype.getLeft = function() { return this.centre.x - (this.size.x / 2); };
AABB.prototype.getRight = function() { return this.centre.x + (this.size.x / 2); };
AABB.prototype.getTop = function() { return this.centre.y - (this.size.y / 2); };
AABB.prototype.getBottom = function() { return this.centre.y + (this.size.y / 2); };

AABB.prototype.ToOBB =
	function()
	{
		return new OBB(this.centre, this.size, 0);
	};

AABB.prototype.testCollision =
	function(shape)
	{
		if(shape instanceof OBB)
			return this.testCollisionVsOBB(shape);
		else if(shape instanceof AABB)
			return this.testCollisionVsAABB(shape);
		return {"hit": false};
	}

AABB.prototype.testCollisionVsOBB =
	function(obb)
	{
		return {"hit": false};
	}

AABB.prototype.testCollisionVsAABB =
	function(aabb)
	{
		var horzOverlap = Math.calculateRangeOverlap(this.getLeft(), this.getRight(), aabb.getLeft(), aabb.getRight());
		var vertOverlap = Math.calculateRangeOverlap(this.getTop(), this.getBottom(), aabb.getTop(), aabb.getBottom());

		if(horzOverlap != 0 && vertOverlap != 0)
		{
			var penetration = new Vec2(0,0);

			if(Math.abs(horzOverlap) < Math.abs(vertOverlap))
				penetration.x = horzOverlap;
			else
				penetration.y += vertOverlap;

			return {"hit": true, "penetration": penetration};
		}

		return {"hit": false};
	}