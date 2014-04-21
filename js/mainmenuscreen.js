/**
 * Created by Ed on 20/04/2014.
 */
function MainMenuScreen(game)
{
	this.game = game;
}

MainMenuScreen.prototype.update = function()
{
	var mouse = this.game.mouse;
	if(mouse.isDown(mouse.LEFT))
	{
		mouse.debounce(mouse.LEFT);
		this.game.screenStack.splice(this.game.screenStack.indexOf(this), 1);
	}
	return true;
};

MainMenuScreen.prototype.draw = function()
{
	return false;
};
