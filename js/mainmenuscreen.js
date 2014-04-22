/**
 * Created by Ed on 20/04/2014.
 */
function MainMenuScreen(game)
{
	this.game = game;

	$("#main-menu").toggleClass("hidden", false);
	$("#new-game").on('click', null, this, function(eventObject){eventObject.data.game.newGame();});
}

MainMenuScreen.prototype.update = function()
{
	return true;
};

MainMenuScreen.prototype.draw = function()
{
};

MainMenuScreen.prototype.deactivate = function()
{
	$("#new-game").off('click');
	$("#main-menu").toggleClass("hidden", true);

	this.game.menuScreen = null;
};
