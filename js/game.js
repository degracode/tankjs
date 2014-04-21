var Game = {};
Game.width = 640;
Game.height = 512;

Game.initialise = function()
{
	var viewport = document.getElementById("viewport");
	this.context = viewport.getContext("2d");

	this.key = new Key();
	this.mouse = new Mouse(viewport);

	this.assets = {};
	this.assets.tank_body = document.getElementById("tank_body");
	this.assets.enemy_tank_body = document.getElementById("enemy_tank_body");
	this.assets.tank_turret = document.getElementById("tank_turret");
	this.assets.block = document.getElementById("block");
	this.assets.shell = document.getElementById("shell");

	this.screenStack = [];
	this.screenStack.push(new WorldScreen(this));
	this.screenStack.push(new MainMenuScreen(this));
};

Game.update = function()
{
	for(var screenIndex in this.screenStack)
	{
		var blockUpdate = this.screenStack[this.screenStack.length-screenIndex-1].update();
		if(blockUpdate)
			break;
	}
};

Game.draw = function()
{
	this.context.clearRect(0, 0, Game.width, Game.height);

	for(var screenIndex in this.screenStack)
	{
		var blockDraw = this.screenStack[screenIndex].draw();
		if(blockDraw)
			break;
	}
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