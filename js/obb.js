"use strict";

/**
 * Created by Ed on 22/04/2014.
 */
function OBB(centre, size, rotation)
{
	this.centre = centre;
	this.size = size;
	this.rotation = rotation;
	this.calculateVectors();
}

OBB.prototype.rotate =
	function(angle)
	{
		this.rotation = (this.rotation + angle) % Math.TwoPi;
		this.calculateVectors();
	};

OBB.prototype.calculateVectors =
	function()
	{
		this.corners = [];
		
		var halfSize = this.size.Muls(0.5);
		
		this.corners.push(halfSize.Rotate(this.rotation).addv(this.centre));
		this.corners.push(new Vec2(-halfSize.x, halfSize.y).rotate(this.rotation).addv(this.centre));
		this.corners.push(new Vec2(-halfSize.x, -halfSize.y).rotate(this.rotation).addv(this.centre));
		this.corners.push(new Vec2(halfSize.x, -halfSize.y).rotate(this.rotation).addv(this.centre));

		var calcNormal = function(corner1, corner2) { var edge = corner2.Subv(corner1).normalise(); return new Vec2(edge.y, -edge.x); };

		this.edges = [];
		this.edges.push([this.corners[0], this.corners[1]]);
		this.edges.push([this.corners[1], this.corners[2]]);
		this.edges.push([this.corners[2], this.corners[3]]);
		this.edges.push([this.corners[3], this.corners[0]]);

		this.axes = [];
		this.axes.push(calcNormal(this.corners[0], this.corners[1]));
		this.axes.push(calcNormal(this.corners[1], this.corners[2]));
		this.axes.push(calcNormal(this.corners[2], this.corners[3]));
		this.axes.push(calcNormal(this.corners[3], this.corners[0]));
	};
	
OBB.prototype.testCollision =
	function(shape)
	{
		if(shape instanceof OBB)
			return this.testCollisionVsOBB(shape);
		else if(shape instanceof AABB)
			return this.testCollisionVsAABB(shape);
		return {"hit": false};
	};

OBB.prototype.testCollisionVsOBB =
	function(obb)
	{
		// for each axis in this
		var projectCorners = function(corners, axis)
		{
			var min = corners[0].Dot(axis);
			var max = min;
			for(var cornerNum = 1; cornerNum < corners.length; ++cornerNum)
			{
				var projection = corners[cornerNum].Dot(axis);
				min = Math.min(min, projection);
				max = Math.max(max, projection);
			}

			return {"min": min, "max": max};
		};

		var smallestOverlap = 0;
		var smallestOverlapAxis = null;

		var axisSet = this.axes.concat(obb.axes);
		for(var axisNum = 0; axisNum < axisSet.length; ++axisNum)
		{
			var axis = axisSet[axisNum];
			var aProjection = projectCorners(this.corners, axis);
			var bProjection = projectCorners(obb.corners, axis);
			if(aProjection.max < bProjection.min || bProjection.max < aProjection.min)
				return {"hit": false};

			var overlap = 0;
			if(aProjection.max > bProjection.min)
				overlap = aProjection.max - bProjection.min;
			else
				overlap = aProjection.min - bProjection.max;

			if(!smallestOverlapAxis || Math.abs(overlap) < Math.abs(smallestOverlap))
			{
				smallestOverlap = overlap;
				smallestOverlapAxis = axis;
			}
		}

		return {"hit": true, "mvt": smallestOverlapAxis.Muls(smallestOverlap)};
	};

OBB.prototype.testCollisionVsAABB =
	function(aabb)
	{
		return {"hit": false};
	};

OBB.prototype.rayTest =
	function(origin, direction)
	{
		var lowestRayT = -1;

		var end = origin.Addv(direction);

		for(var edgeNum = 0; edgeNum < this.edges.length; ++edgeNum)
		{
			var edge = this.edges[edgeNum];

			var denominator = ((edge[1].y - edge[0].y) * (end.x - origin.x)) - ((edge[1].x - edge[0].x) * (end.y - origin.y));
			if (denominator == 0)
				continue;

			var a = origin.y - edge[0].y;
			var b = origin.x - edge[0].x;
			var numerator1 = ((edge[1].x - edge[0].x) * a) - ((edge[1].y - edge[0].y) * b);
			var numerator2 = ((end.x - origin.x) * a) - ((end.y - origin.y) * b);
			a = numerator1 / denominator;
			b = numerator2 / denominator;

			// if we cast these lines infinitely in both directions, they intersect here:
			//result.x = origin.x + (a * (direction.x - origin.x));
			//result.y = origin.y + (a * (direction.y - origin.y));
			/*
			 // it is worth noting that this should be the same as:
			 x = edge[0].x + (b * (edge[1].x - edge[0].x));
			 y = edge[0].y + (b * (edge[1].y - edge[0].y));
			 */
			// if line1 is a segment and line2 is infinite, they intersect if:
			if (a < 0)
				continue;

			// if line2 is a segment and line1 is infinite, they intersect if:
			if (b > 0 && b < 1)
			{
				if(lowestRayT < 0 || a < lowestRayT)
				{
					lowestRayT = a;
				}
			}
		}

		if(lowestRayT >= 0)
			return {"hit": true, "t": lowestRayT};
		else
			return {"hit": false};
	};