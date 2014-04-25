"use strict";

/**
 * Created by Ed on 20/04/2014.
 */
function MainMenuScreen(game)
{
	this.game = game;

	$("#game-container").toggleClass("menu-open", true);
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
	$("#game-container").toggleClass("menu-open", false);

	this.game.menuScreen = null;
};
