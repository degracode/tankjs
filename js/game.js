var Game = {};
Game.width = 640;
Game.height = 512;

Game.initialise = function()
	{
		var viewport = document.getElementById("viewport");
		this.context = viewport.getContext("2d");
		
		this.key = new Key();
		this.mouse = new Mouse(viewport);

		this.assets = {}
		this.assets.tank_body = document.getElementById("tank_body");
		this.assets.tank_turret = document.getElementById("tank_turret");
		this.assets.block = document.getElementById("block");
		
		this.entities = {};
		this.entities.tank = new Tank(new Vec2(128, 128));
		
		var blockNum = 0;
		for(var x = 0; x < Game.width / 64; x++)
		{
			var blockX = (x * 64) + 32;
			this.entities[blockNum] = new Prop(new Vec2(blockX, 32), this.assets.block);
			++blockNum;
			this.entities[blockNum] = new Prop(new Vec2(blockX, Game.height-32), this.assets.block);
			++blockNum
		}
		
		for(var y = 1; y < (Game.height / 64)-1; y++)
		{
			var blockY = (y * 64) + 32;
			this.entities[blockNum] = new Prop(new Vec2(32, blockY), this.assets.block);
			++blockNum;
			this.entities[blockNum] = new Prop(new Vec2(Game.width-32, blockY), this.assets.block);
			++blockNum
		}
		
	};

Game.update = function()
	{
		for(var entityId in this.entities)
		{
			var entity = this.entities[entityId];
			if(entity.update)
				entity.update(this, this.context);
		}
	};

Game.draw = function()
	{
		this.context.clearRect(0,0,Game.width,Game.height);

		for(var entityId in this.entities)
		{
			var entity = this.entities[entityId];
			if(entity.draw)
				entity.draw(this, this.context);
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
				while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip)
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
	window.onEachFrame = function(cb)
		{
			var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
			_cb();
		};
}
else if(window.mozRequestAnimationFrame)
{
	window.onEachFrame = function(cb)
		{
			var _cb = function() {cb(); mozRequestAnimationFrame(_cb); }
			_cb();
		};
}
else
{
	window.onEachFrame = function(cb)
		{
			setInterval(cb, 1000 / Game.fps);
		};
}

Game.initialise();
window.onEachFrame(Game.run());