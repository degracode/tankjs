/**
 * Created by Ed on 20/04/2014.
 */
function MainMenuScreen(game)
{
	this.game = game;

	$("#main-menu").toggleClass("hidden", false);
	$("#new-game").on('click', null, this, function(eventObject){eventObject.data.onNewGame();});
}

MainMenuScreen.prototype.update = function()
{
	return true;
};

MainMenuScreen.prototype.draw = function()
{
	return false;
};

MainMenuScreen.prototype.deactivatePage = function()
{
	$("#new-game").off('click');
	this.game.screenStack.splice(this.game.screenStack.indexOf(this), 1);

	$("#main-menu").toggleClass("hidden", true);
};

MainMenuScreen.prototype.onNewGame = function()
{
	this.deactivatePage();
};