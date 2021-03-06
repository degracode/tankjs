"use strict";

/**
 * Created by Ed on 21/04/2014.
 */
function Team(name)
{
	this.name = name;
	this.members = [];
};

Team.prototype.getNumAliveMembers =
	function()
	{
		return this.members.length;
	};

Team.prototype.addMember =
	function(member)
	{
		var index = this.members.indexOf(member);
		if(index==-1)
		{
			this.members.push(member);
			member.team = this;
		}
	};

Team.prototype.removeMember =
	function(member)
	{
		var index = this.members.indexOf(member);
		if(index!=-1)
		{
			this.members.splice(index, 1);
		}

		member.team = null;
	};
