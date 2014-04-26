"use strict";

function Game()
{
	this.width = 640;
	this.height = 512;
	this.fps = 60;
};

Game.prototype.initialise = function()
{
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
			setInterval(cb, 1000 / this.fps);
		};
	}

	this.resizeCanvas();
	window.addEventListener('resize', this.resizeCanvas, false);

	var viewport = document.getElementById("viewport");
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

	window.onEachFrame(this.run());

	this.worldScreen = new WorldScreen(this, levelData[0]);
	this.menuScreen = new MainMenuScreen(this);
};

Game.prototype.update = function()
{
	var blockWorldUpdate = this.menuScreen ? this.menuScreen.update(): false;

	if(!blockWorldUpdate && this.worldScreen)
	{
		this.worldScreen.update();

		if(this.worldScreen.playerTeam.getNumAliveMembers() == 0)
			this.onGameOver();
	}
};

Game.prototype.draw = function()
{
	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

	if(this.worldScreen)
		this.worldScreen.draw();
	if(this.menuScreen)
		this.menuScreen.draw();
};

Game.prototype.newGame = function()
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
	$("#game-over").toggleClass("on", false);

	this.worldScreen = new WorldScreen(this, levelData[0]);
};

Game.prototype.onGameOver = function()
{
	if(this.menuScreen)
	{
		this.menuScreen.deactivate();
		this.menuScreen = null;
	}

	$("#game-over").toggleClass("on", true);
	this.menuScreen = new MainMenuScreen(this);
};

Game.prototype.run = function()
{
	var loops = 0, skipTicks = 1000 / this.fps;
	var maxFrameSkip = 10;
	var nextGameTick = (new Date).getTime();

	var scope = this;
	return function()
	{
		loops = 0;
		while((new Date).getTime() > nextGameTick && loops < maxFrameSkip)
		{
			scope.update();
			nextGameTick += skipTicks;
			++loops;
		}

		scope.draw();
	};
};

Game.prototype.resizeCanvas =
	function()
	{
		var contentNode = document.getElementById("content");
		var aspectRatio = this.width / this.height;
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

		this.worldToCanvasRatio = newWidth / this.width;
	};

Game.prototype.worldToCanvas = function(position)
{
	if(position instanceof Vec2)
		return position.Muls(this.worldToCanvasRatio);
	else
		return position * this.worldToCanvasRatio;
};

Game.prototype.canvasToWorld = function(position)
{
	if(position instanceof Vec2)
		return position.Divs(this.worldToCanvasRatio);
	else
		return position / this.worldToCanvasRatio;
};

function cancelDefaultEventBehaviour(event)
{
	var e = event ? event: window.event;
	if(e.preventDefault) e.preventDefault();
	e.returnValue = false;
	return false;
}

var game = new Game();
$(window).load(function()
{
	game.initialise();
});