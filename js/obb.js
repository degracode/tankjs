/**
 * Created by Ed on 22/04/2014.
 */
function OBB(centre, size, rotation)
{
	this.centre = centre;
	this.size = size;
	this.rotation = rotation;
	this.calculateCorners();
}

OBB.prototype.rotate =
	function(angle)
	{
		this.rotation = (this.rotation + angle) % Math.TwoPi;
		this.calculateCorners();
	}

OBB.prototype.calculateCorners =
	function()
	{
		this.corners = [];
		
		var halfSize = this.size.Muls(0.5);
		
		this.corners.push(halfSize.Rotate(this.rotation).addv(this.centre));
		this.corners.push(new Vec2(-halfSize.x, halfSize.y).rotate(this.rotation).addv(this.centre));
		this.corners.push(new Vec2(halfSize.x, -halfSize.y).rotate(this.rotation).addv(this.centre));
		this.corners.push(new Vec2(-halfSize.x, -halfSize.y).rotate(this.rotation).addv(this.centre));
	}
	
OBB.prototype.testCollision =
	function(shape)
	{
		if(shape instanceof OBB)
			return this.testCollisionVsOBB(shape);
		else if(shape instanceof AABB)
			return this.testCollisionVsAABB(shape);
		return {"hit": false};
	}

OBB.prototype.testCollisionVsOBB =
	function(obb)
	{
		return {"hit": false};
	}

OBB.prototype.testCollisionVsAABB =
	function(aabb)
	{
		return {"hit": false};
	}