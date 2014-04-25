"use strict";

Math.TwoPi = Math.PI * 2;
Math.Pi = Math.PI;

Math.lerp = function( source, dest, t )
{
	return (source * (1.0 - t)) + (dest * t)
};

Math.angleLerp = function( source, dest, t )
{
	var diff = Math.abs(source - dest);
	if(diff > Math.PI)
	{
		if(source < dest) source += Math.TwoPi;
		else dest += Math.TwoPi;
	}

	var result = Math.lerp(source, dest, t);
	return result % Math.TwoPi;
};

Math.isBetween = function( value, min, max )
{
	return value >= min && value <= max;
};

Math.calculateRangeOverlap = function( min1, max1, min2, max2 )
{
	if(max1 < min2 || min1 > max2)
		return 0;

	if(Math.isBetween(min1, min2, max2))
		return max2 - min1;
	if(Math.isBetween(max1, min2, max2))
		return min2 - max1;
	return 0;
};

Math.sign = function(value)
{
	if(value < 0)
		return -1;
	else if(value > 0)
		return 1;
	else
		return 0;
};
