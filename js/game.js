var Game = {};
Game.width = 640;
Game.height = 512;

Game.initialise = function()
{
	var viewport = document.getElementById("viewport");
	this.context = viewport.getContext("2d");

	this.key = new Key();
	this.mouse = new Mouse(viewport);

	this.trackEffects = [];

	this.assets = {};
	this.assets.tank_body = document.getElementById("tank_body");
	this.assets.tank_turret = document.getElementById("tank_turret");
	this.assets.block = document.getElementById("block");
	this.assets.shell = document.getElementById("shell");

	this.entities = {};
	this.nextEntityId = 0;

	this.playerTeam = new Team("Player");
	this.enemyTeam = new Team("Enemy");

	var playerTank = this.addEntity(new Tank(new Vec2(128, 128), this));
	playerTank.controlInterface = new ControlInterfacePlayer(playerTank);
	this.playerTeam.addMember(playerTank);

	var aiTank = this.addEntity(new Tank(new Vec2(400, 300), this));
	aiTank.controlInterface = new ControlInterfaceAI(aiTank);
	this.enemyTeam.addMember(aiTank);

	for(var x = 0; x < Game.width / 64; x++)
	{
		var blockX = (x * 64) + 32;
		this.addEntity(new Prop(new Vec2(blockX, 32), this.assets.block));
		this.addEntity(new Prop(new Vec2(blockX, Game.height - 32), this.assets.block));
	}

	for(var y = 1; y < (Game.height / 64) - 1; y++)
	{
		var blockY = (y * 64) + 32;
		this.addEntity(new Prop(new Vec2(32, blockY), this.assets.block));
		this.addEntity(new Prop(new Vec2(Game.width - 32, blockY), this.assets.block));
	}
};

Game.update = function()
{
	for(var entityId in this.entities)
	{
		var entity = this.entities[entityId];
		if(entity.update)
			entity.update();
	}
};

Game.draw = function()
{
	this.context.clearRect(0, 0, Game.width, Game.height);

	for(var track in this.trackEffects)
	{
		this.trackEffects[track].draw(this.context);
	}

	for(var entityId in this.entities)
	{
		var entity = this.entities[entityId];
		if(entity.draw)
			entity.draw(this.context);
	}
};

Game.addEntity = function(entity)
{
	var id = this.nextEntityId;
	++this.nextEntityId;
	this.entities[id] = entity;
	entity.id = id;

	return entity;
};

Game.removeEntity = function(id)
{
	delete this.entities[id];
};

Game.fps = 60;

Game.run = function()
{
	var loops = 0, skipTicks = 1000 / Game.fps;
	var maxFrameSkip = 10;
	var nextGameTick = (new Date).getTime();

	return function()
	{
		loops = 0;
		while((new Date).getTime() > nextGameTick && loops < maxFrameSkip)
		{
			Game.update();
			nextGameTick += skipTicks;
			++loops;
		}

		Game.draw();
	};
};

if(window.webkitRequestAnimationFrame)
{
	window.onEachFrame = function( cb )
	{
		var _cb = function()
		{
			cb();
			webkitRequestAnimationFrame(_cb);
		};
		_cb();
	};
}
else if(window.mozRequestAnimationFrame)
{
	window.onEachFrame = function( cb )
	{
		var _cb = function()
		{
			cb();
			mozRequestAnimationFrame(_cb);
		};
		_cb();
	};
}
else
{
	window.onEachFrame = function( cb )
	{
		setInterval(cb, 1000 / Game.fps);
	};
}

function cancelDefaultEventBehaviour(event)
{
	var e = event ? event: window.event;
	if(e.preventDefault) e.preventDefault();
	e.returnValue = false;
	return false;
}

Game.initialise();
window.onEachFrame(Game.run());