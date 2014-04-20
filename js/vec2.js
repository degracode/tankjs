function Vec2( x, y )
{
	this.x = x;
	this.y = y;
}

Vec2.prototype.Clone = function()
{
	return new Vec2(this.x, this.y);
};

Vec2.prototype.Addv = function( vec )
{
	return this.Clone().addv(vec);
};
Vec2.prototype.addv = function( vec )
{
	this.x += vec.x;
	this.y += vec.y;
	return this;
};

Vec2.prototype.Adds = function( scalar )
{
	return this.Clone().adds(scalar);
};
Vec2.prototype.adds = function( scalar )
{
	this.x += scalar;
	this.y += scalar;
	return this;
};

Vec2.prototype.Subv = function( vec )
{
	return this.Clone().subv(vec);
};
Vec2.prototype.subv = function( vec )
{
	this.x -= vec.x;
	this.y -= vec.y;
	return this;
};

Vec2.prototype.Subs = function( scalar )
{
	return this.Clone().subs(scalar);
};
Vec2.prototype.subs = function( scalar )
{
	this.x -= scalar;
	this.y -= scalar;
	return this;
};

Vec2.prototype.Negate = function()
{
	return this.Clone().negate();
};
Vec2.prototype.negate = function()
{
	this.x = -this.x;
	this.y = -this.y;
	return this;
};

Vec2.prototype.Mulv = function( vec )
{
	return this.Clone().mulv(vec);
};
Vec2.prototype.mulv = function( vec )
{
	this.x *= vec.x;
	this.y *= vec.y;
	return this;
};

Vec2.prototype.Muls = function( scalar )
{
	return this.Clone().muls(scalar);
};
Vec2.prototype.muls = function( scalar )
{
	this.x *= scalar;
	this.y *= scalar;
	return this;
};

Vec2.prototype.Normalise = function()
{
	return this.Clone().normalise();
};
Vec2.prototype.normalise = function()
{
	var length = Math.sqrt((this.x * this.x) + (this.y * this.y));
	this.muls(1.0 / length);
	return this;
};

Vec2.prototype.ScaleToLength = function(length)
{
	return this.Clone().scaleToLength(length);
};

Vec2.prototype.scaleToLength = function(newLength)
{
	var length = Math.sqrt((this.x * this.x) + (this.y * this.y));
	this.muls(newLength / length);
	return this;
};

Vec2.prototype.isZero = function()
{
	return (this.x == 0 && this.y == 0);
};

Vec2.prototype.equals = function(rhs)
{
	return this.x==rhs.x && this.y==rhs.y;
};