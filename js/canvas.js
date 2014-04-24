/**
 * Created by Ed on 24/04/2014.
 */
function Canvas(context)
{
	this.context = context;
}

Canvas.prototype.save = function() { this.context.save(); };
Canvas.prototype.restore = function() { this.context.restore(); };
Canvas.prototype.translate = function(translation) { this.context.translate(translation.x, translation.y); };
Canvas.prototype.rotate = function(angleRads) { this.context.rotate(angleRads); };
Canvas.prototype.drawImage = function(image, position, size) { this.context.drawImage(image, position.x, position.y, size.x, size.y); };
Canvas.prototype.getCanvas = function() { return this.context; };
Canvas.prototype.beginPath = function() { this.context.beginPath(); };
Canvas.prototype.moveTo = function(position) { this.context.moveTo(position.x, position.y); };
Canvas.prototype.lineTo = function(position) { this.context.lineTo(position.x, position.y); };
Canvas.prototype.stroke = function() { this.context.stroke(); };
Canvas.prototype.setLineDash = function(dash) { this.context.setLineDash(dash); };

