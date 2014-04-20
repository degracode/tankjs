/**
 * Created by Ed on 20/04/2014.
 */
function TrailEffect()
{
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
			canvas.moveTo(this.points[0].x, this.points[0].y);
			for(var pointNum = 1; pointNum < this.points.length; ++pointNum)
			{
				canvas.lineTo(this.points[pointNum].x, this.points[pointNum].y);
			}
			canvas.lineWidth = 5;
			canvas.strokeStyle = 'rgb(0, 0, 0)';
			canvas.globalAlpha = 0.2;
			canvas.setLineDash([3,2]);
			canvas.stroke();

			canvas.restore();
		}
	};
