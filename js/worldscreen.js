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

	this.addAITank(new Vec2(400, 300));

	for(var x = 0; x < Game.width / 64; x++)
	{
		var blockX = (x * 64) + 32;
		this.addBlock(new Vec2(blockX, 32));
		this.addBlock(new Vec2(blockX, Game.height - 32));
	}

	for(var y = 1; y < (Game.height / 64) - 1; y++)
	{
		var blockY = (y * 64) + 32;
		this.addBlock(new Vec2(32, blockY));
		this.addBlock(new Vec2(Game.width - 32, blockY));
	}

	this.addBlock(new Vec2(416, 224), this.game.assets.block);
	this.addBlock(new Vec2(352, 224), this.game.assets.block);
	this.addBlock(new Vec2(288, 224), this.game.assets.block);
	this.addBlock(new Vec2(288, 288), this.game.assets.block);
	this.addBlock(new Vec2(288, 352), this.game.assets.block);
};

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

WorldScreen.prototype.addAITank = function(position)
{
	var aiTank = this.addEntity(new Tank(position, this, this.game.assets.enemy_tank_body, this.game.assets.tank_turret));
	aiTank.controlInterface = new ControlInterfaceAI(aiTank);
	this.enemyTeam.addMember(aiTank);
};

WorldScreen.prototype.addBlock = function(position)
{
	this.addEntity(new Prop(position, this.game.assets.block));
};

WorldScreen.prototype.rayTest = function(origin, direction, entityToIgnore)
{
	var normalisedDirection = direction.Normalise();

	var result = {};
	result.hit = false;
	result.position = null;
	result.entity = null;
	result.distance = 0;

	var lowestRayT = -1;

	for(var entityId in this.entities)
	{
		var entity = this.entities[entityId];
		if(entity.bounds && entity != entityToIgnore)
		{
			var rayTestResult = entity.bounds.rayTest(origin, normalisedDirection);
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
		result.position = origin.Addv(normalisedDirection.Muls(lowestRayT));
		result.distance = lowestRayT;
	}

	return result;
};