"use strict";

/**
 * Created by Ed on 20/04/2014.
 */
function TrailEffect(screen)
{
	this.screen = screen;
	this.numSegments = 10;
	this.points = [];

	this.currentLength = 0;
}

TrailEffect.prototype.addPoint =
	function(positionVec)
	{
		if(this.points.length > 0)
		{
			if(this.points[this.points.length-1].equals(positionVec))
				return;

			this.currentLength += this.screen.game.worldToCanvas(positionVec).DistanceTo(this.screen.game.worldToCanvas(this.points[this.points.length-1]));
		}

		this.points.push(positionVec.Clone());
		if(this.numSegments > 0)
		{
			if(this.points.length > this.numSegments)
			{
				this.points.shift();
			}
		}
	};

TrailEffect.prototype.draw =
	function(canvas)
	{
		if(this.points.length > 0)
		{
			canvas.save();

			canvas.beginPath();
			canvas.moveTo(this.screen.game.worldToCanvas(this.points[this.points.length-1]));
			for(var pointNum = 1; pointNum < Math.min(100, this.points.length); ++pointNum)
			{
				canvas.lineTo(this.screen.game.worldToCanvas(this.points[this.points.length-pointNum]));
			}
			canvas.getCanvas().lineWidth = this.screen.game.worldToCanvas(5);
			canvas.getCanvas().strokeStyle = 'rgb(0, 0, 0)';
			canvas.getCanvas().globalAlpha = 0.2;
			canvas.getCanvas().lineDashOffset = -this.currentLength;
			canvas.setLineDash([this.screen.game.worldToCanvas(3),this.screen.game.worldToCanvas(2)]);
			canvas.stroke();

			canvas.restore();
		}
	};
