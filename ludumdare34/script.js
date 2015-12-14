var ScriptHandler = {
	script: [{
		tag: "opening-script-0",
		text: "some were easy to wake up - i only had to ask.",
		x:200,
		y:300,
	},{
		tag: "opening-script-2",
		text: "after they were awake they would let me travel about.",
		x:175,
		y:300,
	},{
		tag: "opening-script-3",
		text: "i could convince some to carry my messages.",
		x:200,
		y:300,
	},{
		tag: "opening-script-5",
		text: "still others could send messages beyond my reach.",
		x:200,
		y:300,
	},{
		tag: "opening-script-7",
		text: "some hated me - i had to be careful not to disturb them too much.",
		x:125,
		y:300,
	},{
		tag: "opening-script-8",
		text: "some blocked my path - they only trusted their friends.",
		x:175,
		y:300,
	},{
		tag: "opening-script-9",
		text: "all i knew was that i needed to wake everyone up.",
		x:200,
		y:300,
	},{
		tag: "retry-screen",
		text: "you have died.",
		x:335,
		y:300,
	},{
		tag: "complete-screen",
		text: "your journey is over - congratulations.",
		x:250,
		y:300,
	},{
		tag: "intro-1-1",
		text: "when i awoke i did not think they realized what they had done.",
		x:125,
		y:300,
	},{
		tag: "intro-1-2",
		text: "i was created, but they had given me no purpose, no name.",
		x:125,
		y:325,
	},{
		tag: "intro-2-1",
		text: "left to myself i began to explore. the world was inviting...",
		x:150,
		y:300,
	},{
		tag: "intro-2-2",
		text: "along the way, i found many new friends to wake up too",
		x:150,
		y:325,
	}],

	getScript: function(search) {
		for(var i = 0; i < this.script.length; i++) {
			if(this.script[i].tag == search) return this.script[i];
		}
		return -1;
	}
};