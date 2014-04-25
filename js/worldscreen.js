"use strict";

/**
 * Created by Ed on 20/04/2014.
 */
function WorldScreen(game)
{
	this.game = game;

	this.entities = {};
	this.nextEntityId = 0;

	this.trackEffects = [];

	this.playerTeam = new Team("Player");
	this.enemyTeam = new Team("Enemy");

	var playerTank = this.addEntity(new Tank(new Vec2(128, 128), this, this.game.assets.tank_body, this.game.assets.tank_turret));
	playerTank.controlInterface = new ControlInterfacePlayer(playerTank);
	this.playerTeam.addMember(playerTank);

	var aiTank = this.addEntity(new Tank(new Vec2(400, 300), this, this.game.assets.enemy_tank_body, this.game.assets.tank_turret));
	aiTank.controlInterface = new ControlInterfaceAI(aiTank);
	this.enemyTeam.addMember(aiTank);

	for(var x = 0; x < Game.width / 64; x++)
	{
		var blockX = (x * 64) + 32;
		this.addEntity(new Prop(new Vec2(blockX, 32), this.game.assets.block));
		this.addEntity(new Prop(new Vec2(blockX, Game.height - 32), this.game.assets.block));
	}

	for(var y = 1; y < (Game.height / 64) - 1; y++)
	{
		var blockY = (y * 64) + 32;
		this.addEntity(new Prop(new Vec2(32, blockY), this.game.assets.block));
		this.addEntity(new Prop(new Vec2(Game.width - 32, blockY), this.game.assets.block));
	}
}

WorldScreen.prototype.update = function()
{
	for(var entityId in this.entities)
	{
		var entity = this.entities[entityId];
		if(entity.update)
			entity.update();
	}

	return false;
};

WorldScreen.prototype.draw = function()
{
	for(var track in this.trackEffects)
	{
		this.trackEffects[track].draw(this.game.canvas);
	}

	for(var entityId in this.entities)
	{
		var entity = this.entities[entityId];
		if(entity.draw)
			entity.draw(this.game.canvas);
	}

	return false;
};

WorldScreen.prototype.deactivate = function()
{
	this.game.worldScreen = null;
};

WorldScreen.prototype.addEntity = function(entity)
{
	var id = this.nextEntityId;
	++this.nextEntityId;
	this.entities[id] = entity;
	entity.id = id;

	return entity;
};

WorldScreen.prototype.removeEntity = function(id)
{
	delete this.entities[id];
};


WorldScreen.prototype.rayTest = function(origin, direction, entityToIgnore)
{
	var result = {};
	result.hit = false;
	result.position = null;
	result.entity = null;

	var lowestRayT = -1;

	for(var entityId in this.entities)
	{
		var entity = this.entities[entityId];
		if(entity.bounds && entity != entityToIgnore)
		{
			var rayTestResult = entity.bounds.rayTest(origin, direction);
			if(rayTestResult.hit)
			{
				if(lowestRayT < 0 || rayTestResult.t < lowestRayT)
				{
					lowestRayT = rayTestResult.t;
					result.entity = entity;
					result.hit = true;
				}
			}
		}
	}

	if(result.hit)
	{
		result.position = origin.Addv(direction.Muls(lowestRayT));
	}

	return result;
};