"use strict";

var Game = {};
Game.width = 640;
Game.height = 512;

Game.initialise = function()
{
	Game.resizeCanvas();
	window.addEventListener('resize', Game.resizeCanvas, false);

	this.context = viewport.getContext("2d");
	this.canvas = new Canvas(this.context);

	this.key = new Key();
	this.mouse = new Mouse(viewport);

	this.assets = {};
	this.assets.tank_body = document.getElementById("tank_body");
	this.assets.enemy_tank_body = document.getElementById("enemy_tank_body");
	this.assets.tank_turret = document.getElementById("tank_turret");
	this.assets.block = document.getElementById("block");
	this.assets.shell = document.getElementById("shell");

	this.worldScreen = new WorldScreen(this);
	this.menuScreen = new MainMenuScreen(this);
};

Game.update = function()
{
	var blockWorldUpdate = this.menuScreen ? this.menuScreen.update(): false;

	if(!blockWorldUpdate && this.worldScreen)
	{
		this.worldScreen.update();

		if(this.worldScreen.playerTeam.getNumAliveMembers() == 0)
			this.onGameOver();
	}
};

Game.draw = function()
{
	this.context.clearRect(0, 0, Game.context.canvas.width, Game.context.canvas.height);

	if(this.worldScreen)
		this.worldScreen.draw();
	if(this.menuScreen)
		this.menuScreen.draw();
};

Game.newGame = function()
{
	if(this.menuScreen)
	{
		this.menuScreen.deactivate();
		this.menuScreen = null;
	}
	if(this.worldScreen)
	{
		this.worldScreen.deactivate();
		this.worldScreen = null;
	}
	this.worldScreen = new WorldScreen(this);
};

Game.onGameOver = function()
{
	if(this.menuScreen)
	{
		this.menuScreen.deactivate();
		this.menuScreen = null;
	}
	this.menuScreen = new MainMenuScreen(this);
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

Game.resizeCanvas =
	function()
	{
		var contentNode = document.getElementById("content");
		var aspectRatio = Game.width / Game.height;
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;
		var newAspectRatio = newWidth / newHeight;
		if(newAspectRatio > aspectRatio)
			newWidth = newHeight * aspectRatio;
		else
			newHeight = newWidth / aspectRatio;
		contentNode.style.width = newWidth + "px";
		contentNode.style.height = newHeight + "px";
		contentNode.style.marginLeft = (-newWidth / 2) + "px";
		contentNode.style.marginTop = (-newHeight / 2) + "px";

		var viewport = document.getElementById("viewport");
		viewport.width = newWidth;
		viewport.height = newHeight;

		Game.worldToCanvasRatio = newWidth / Game.width;
	};

Game.worldToCanvas = function(position)
{
	if(position instanceof Vec2)
		return position.Muls(Game.worldToCanvasRatio);
	else
		return position * Game.worldToCanvasRatio;
};

Game.canvasToWorld = function(position)
{
	if(position instanceof Vec2)
		return position.Divs(Game.worldToCanvasRatio);
	else
		return position / Game.worldToCanvasRatio;
};

Game.initialise();
window.onEachFrame(Game.run());