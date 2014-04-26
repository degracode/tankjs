"use strict";

/**
 * Created by Ed on 20/04/2014.
 */
function TrailEffect(screen)
{
	this.screen = screen;
	this.numSegments = 10;
	this.points = [];
}

TrailEffect.prototype.addPoint =
	function(positionVec)
	{
		if(this.points.length > 0)
		{
			if(this.points[this.points.length-1].equals(positionVec))
				return;
		}

		this.points.push(positionVec.Clone());
		if(this.numSegments > 0 && this.points.length > this.numSegments)
		{
			this.points.shift();
		}
	};

TrailEffect.prototype.draw =
	function(canvas)
	{
		if(this.points.length > 0)
		{
			canvas.save();

			canvas.beginPath();
			canvas.moveTo(this.screen.game.worldToCanvas(this.points[0]));
			for(var pointNum = 1; pointNum < this.points.length; ++pointNum)
			{
				canvas.lineTo(this.screen.game.worldToCanvas(this.points[pointNum]));
			}
			canvas.getCanvas().lineWidth = this.screen.game.worldToCanvas(5);
			canvas.getCanvas().strokeStyle = 'rgb(0, 0, 0)';
			canvas.getCanvas().globalAlpha = 0.2;
			canvas.setLineDash([this.screen.game.worldToCanvas(3),this.screen.game.worldToCanvas(2)]);
			canvas.stroke();

			canvas.restore();
		}
	};
