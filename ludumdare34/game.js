(function() {
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var ctx = null;

    var Game = {
        canvas: document.getElementById("gamecanvas"),

        setup: function() {
            if (this.canvas.getContext) {
                ctx = this.canvas.getContext('2d');
                this.width = this.canvas.width;
                this.height = this.canvas.height;
                AssetLoader.loadAssets();
                this.runGame();
                this.frameCount = 0;

                //GameAudio.jukebox["beats"].play();
                //GameAudio.jukebox["electro"].play();
            }
        },

        init: function() {
            this.level = 0;
            SceneHandler.init();
            Ctrl.init();
            GameAudio.init();
            Screen.init();
            Player.init();
            LevelRenderer.init(this.level);
            Hud.init();

            //GameAudio.jukebox["electro"].play();
        },

        animate: function() {
            Game.play = requestAnimFrame(Game.animate);
            Game.draw();
        },

        draw: function() {
            this.frameCount++;
            Screen.draw();
            if (this.frameCount >= Number.MAX_VALUE - 1000) this.frameCount = 0;
        },

        runGame: function() {
            Game.init();
            Game.animate();
        }
    };

    var Player = {
        init: function() {
            this.selected = 0;
            this.index = 0;
            this.paths = getPathsForNode(this.index);
            this.keyBag = [];
            this.dead = false;
        },

        setIndex: function(index) {
            this.selected = 0;
            this.index = index;
            this.paths = getPathsForNode(this.index);
        },

        update: function() {
            if (Ctrl.rotate && Ctrl.rotateReset) {
                this.selected++;
                if (this.selected >= this.paths.length) this.selected = 0;
                Ctrl.rotateReset = false;
            }

            if (Ctrl.fire && Ctrl.fireReset) {
                var indexInPathsList = this.paths[this.selected];
                var indexOfNeighbor = levelarray[Game.level].paths[indexInPathsList].a;
                if (indexOfNeighbor == this.index) indexOfNeighbor = levelarray[Game.level].paths[indexInPathsList].b;

                LevelRenderer.updateNode(indexOfNeighbor, this.index);
                Ctrl.fireReset = false;
            }

            if (Ctrl.right && Ctrl.rightReset && Ctrl.debug && Game.level < levelarray.length - 1) {
                Game.level++;
                LevelRenderer.init(Game.level);
                Player.init();
                Ctrl.rightReset = false;
            }

            if (Ctrl.left && Ctrl.leftReset && Ctrl.debug && Game.level > 0) {
                Game.level--;
                LevelRenderer.init(Game.level);
                Player.init();
                Ctrl.leftReset = false;               
            }
        },

        addKey: function(team) {
            this.keyBag.push(team);
            removeTeam(team, 0);
        },

        hasKey: function(search) {
            for (var i = 0; i < this.keyBag.length; i++) {
                if (this.keyBag[i] == search) return true;
            }
            return false;
        }
    };

    var Screen = {
        init: function() {
            SceneHandler.addScene({
                name: "TITLE-SCREEN",
                init: function(){},
                draw: function() {
                    if (Ctrl.fire && Ctrl.fireReset) {
                        //GameAudio.jukebox["beats"].play();
                        SceneHandler.setCurrentScene("START-SCREEN-1");
                        Ctrl.fireReset = false;
                    }
                    ctx.fillStyle = '#47a1be';
                    ctx.font = "36px Arial";
                    ctx.fillText("ARTIFICIAL", 290, 200);
                    ctx.font = "18px Arial";
                    ctx.fillStyle = '#efefef';
                    ctx.fillText("a game by jacob troxel and cj buresch", 230, 250);
                    ctx.fillText("made in 48 hours for ludum dare 34", 235, 275);
                    ctx.fillText("[f] to change direction", 295, 325);
                    ctx.fillText("[shift] to interact", 320, 350);
                    ctx.font = "14px Arial";
                    ctx.fillText("press [shift] to start", 330, 500);
                }
            });

            SceneHandler.addScene({
                name: "INTRO-1",
                init: function() {},
                draw: function() {
                    if (Ctrl.fire && Ctrl.fireReset) {
                        SceneHandler.setCurrentScene("INTRO-2");
                        Ctrl.fireReset = false;
                    }
                    this.Script = ScriptHandler.getScript("intro-1-1");
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "#efefef";
                    if(this.Script != -1) {
                        ctx.fillText(this.Script.text, this.Script.x, this.Script.y);
                    }

                    this.Script = ScriptHandler.getScript("intro-1-2");
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "#efefef";
                    if(this.Script != -1) {
                        ctx.fillText(this.Script.text, this.Script.x, this.Script.y);
                    }

                    ctx.font = "14px Arial";
                    ctx.fillText("press [shift] to continue.", 330, 500);
                }
            });

            SceneHandler.addScene({
                name: "INTRO-2",
                init: function() {},
                draw: function() {
                    if (Ctrl.fire && Ctrl.fireReset) {
                        SceneHandler.setCurrentScene("TEXT-WALL");
                        Ctrl.fireReset = false;
                    }
                    this.Script = ScriptHandler.getScript("intro-2-1");
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "#efefef";
                    if(this.Script != -1) {
                        ctx.fillText(this.Script.text, this.Script.x, this.Script.y);
                    }

                    this.Script = ScriptHandler.getScript("intro-2-2");
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "#efefef";
                    if(this.Script != -1) {
                        ctx.fillText(this.Script.text, this.Script.x, this.Script.y);
                    }

                    ctx.font = "14px Arial";
                    ctx.fillText("press [shift] to continue.", 330, 500);
                }
            });

            SceneHandler.addScene({
                name: "START-SCREEN-1",
                init: function() {
                },
                draw: function() {
                    if (Ctrl.fire && Ctrl.fireReset) {
                        SceneHandler.setCurrentScene("START-SCREEN-2");
                        Ctrl.fireReset = false;
                    }
                    ctx.fillStyle = "#efefef";
                    ctx.font = "14px Arial";
                    ctx.fillText("press [shift] to turn on.", 330, 500);
                    AssetLoader.renderNode(Game.width / 2 - 12, Game.height / 2 - 12, 3, "base", undefined);
                }
            });

            SceneHandler.addScene({
                name: "START-SCREEN-2",
                init: function() {},
                draw: function() {
                    if (Ctrl.fire && Ctrl.fireReset) {
                        SceneHandler.setCurrentScene("INTRO-1");
                        Ctrl.fireReset = false;
                    }
                    ctx.fillStyle = "#efefef";
                    ctx.font = "14px Arial";
                    ctx.fillText("press [shift] to begin your story.", 310, 500);
                    AssetLoader.renderNode(Game.width / 2 - 12, Game.height / 2 - 12, 0, "base", undefined);
                }
            });

            SceneHandler.addScene({
                name: "GAME-SCREEN",
                init: function() {
                },
                draw: function() {
                    // ctx.save();


                    if (LevelRenderer.notresolvedCount > 0) {
                        //REGULAR PLAY
                        if(Player.dead) {
                            LevelRenderer.init(Game.level);
                            Player.init();
                        }
                        Player.update();
                        this.framereference = Game.frameCount;
                        LevelRenderer.draw();

                    } else {
                        if (Game.level == levelarray.length - 1) {
                            if (Game.frameCount - this.framereference > 45)
                                SceneHandler.setCurrentScene("YOU-WIN");
                            else
                                LevelRenderer.draw();
                            return;
                        }
                        // GameAudio.jukebox["whoa"].play();

                        //only do after scene transition
                        LevelRenderer.draw();

                        if ((Game.frameCount - this.framereference) > 90) {
                            Game.level++;
                            LevelRenderer.init(Game.level);
                            Player.init();
                            SceneHandler.setCurrentScene("TEXT-WALL");
                        }
               
                        // SceneTransition(LevelRenderer.draw());
                    }
                }
            });

            SceneHandler.addScene({
                name: "TEXT-WALL",
                init: function() {
                    this.Script = -1;
                    if(Player.dead) {
                        this.fillStyle = '#ff6666';
                        this.Script = ScriptHandler.getScript("retry-screen");
                    } else {
                        this.fillStyle = '#efefef';
                        this.Script = ScriptHandler.getScript("opening-script-"+Game.level);
                    }
                    if(this.Script == -1) {
                        SceneHandler.setCurrentScene("GAME-SCREEN");
                    }
                },
                draw: function() {
                    if (Ctrl.fire && Ctrl.fireReset) {
                        SceneHandler.setCurrentScene("GAME-SCREEN");
                        Ctrl.fireReset = false;
                    }
                    ctx.font = "20px Arial";
                    ctx.fillStyle = this.fillStyle;
                    ctx.fillText(this.Script.text, this.Script.x, this.Script.y);
                    ctx.fillStyle = '#efefef';
                    ctx.font = "14px Arial";
                    ctx.fillText("press [shift] to continue.", 330, 500);
                }
            });

            SceneHandler.addScene({
                name: "YOU-WIN",
                init: function() {},
                draw: function() {
                    if (Ctrl.fire && Ctrl.fireReset) {
                        Game.init();
                        SceneHandler.setCurrentScene("TITLE-SCREEN");
                        Ctrl.fireReset = false;
                    }
                    ctx.fillStyle = '#99ff99';
                    ctx.font = "20px Arial";
                    var Script = ScriptHandler.getScript("complete-screen");
                    if(Script != -1) {
                        ctx.fillText(Script.text, Script.x, Script.y);
                    }
                    ctx.fillStyle = '#efefef';
                    ctx.font = "14px Arial";
                    ctx.fillText("press [shift] to play again.", 330, 500);
                }
            });

            SceneHandler.setCurrentScene("TITLE-SCREEN");
        },
        draw: function() {
            ctx.save();
            ctx.clearRect(0, 0, Game.width, Game.height);
            ctx.fillStyle = '#303030';
            ctx.fillRect(0, 0, Game.width, Game.height);
            if (SceneHandler.currentScene >= 0) {
                var Scene = SceneHandler.sceneList[SceneHandler.currentScene];
                Scene.draw();
            }
            ctx.restore();
        }
    };

    var AssetLoader = {
        loadAssets: function() {
            this.button = new Image();
            this.button.src = 'res/buttons.png';
            this.sprites = new Image();
            this.sprites.src = 'res/player.png ';
        },

        renderNode: function(x, y, color, type, team) {
            if (team != undefined && team >= 0 && team < 6) {
                var teamColors = ["#ff6d6d", "#c78ef4", "#ff9936", "#3574cb", "#ff95ca", "#13b78a"];
                ctx.beginPath();
                ctx.fillStyle = teamColors[team];
                //ctx.arc(x + 2, y + 2, 4, 0, 2 * Math.PI);
                ctx.fillRect(x - 4, y - 4, 32, 32);
                //ctx.fill();
            }

            switch (type) {
                case "broadcast":
                    ctx.drawImage(this.sprites, 24 * color, 24, 24, 24, x, y, 24, 24);
                    break;
                case "pirate":
                    ctx.drawImage(this.sprites, 24 * color, 48, 24, 24, x, y, 24, 24);
                    break;
                case "firewall":
                    ctx.drawImage(this.sprites, 24 * color, 72, 24, 24, x, y, 24, 24);
                    break;
                case "receiver":
                    ctx.drawImage(this.sprites, 24 * color, 96, 24, 24, x, y, 24, 24);
                    break;
                case "base":
                    ctx.drawImage(this.sprites, 24 * color, 0, 24, 24, x, y, 24, 24);
                    break;
            }
        }
    };

    function SceneTransition(callback) {
        setTimeout(function() {
            var interval = setInterval(callback, 0);
        }, 3000);
    }

    var Hud = {
        init: function() {
            this.level = 1;
        },

        draw: function() {}
    };

    var GameAudio = {
        init: function() {
            this.jukebox = {};
            this.jukebox["hostup"] = new Audio("aud/hostup.ogg");
            this.jukebox["hostup"].volume = .1;
            this.jukebox["hostup"].load();

            /*this.jukebox["whoa"] = new Audio("aud/whoa.ogg");
            this.jukebox["whoa"].volume = .5;
            this.jukebox["whoa"].load();*/

            /*this.jukebox["beats"] = new Audio("aud/electro-track.mp3");
            this.jukebox["beats"].volume = .3;
            this.jukebox["beats"].loop = true;
            this.jukebox["beats"].load();*/
        },
        play: function(x) {
            this.jukebox[x].play();
        }
    };

    var Ctrl = {
        init: function() {
            this.rotateReset = true;
            this.fireReset = true;
            this.debug = false;
            this.debugReset = true;
            this.leftReset = true;
            this.leftReset = true;
            window.addEventListener('keydown', this.keyDown, true);
            window.addEventListener('keyup', this.keyUp, true);
        },

        keyDown: function(event) {
            switch (event.keyCode) {
                case 70: //space
                    Ctrl.rotate = true;
                    break;
                case 16:
                    Ctrl.fire = true;
                    break;
                case 81:
                    if (Ctrl.debugReset) Ctrl.debug = !Ctrl.debug;
                    Ctrl.debugReset = false;
                case 37: //left arrow
                    Ctrl.left = true;
                    break;
                case 39: //right arrow
                    Ctrl.right = true;
                    break;
                default:
                    break;

            }
        },

        keyUp: function(event) {
            switch (event.keyCode) {
                case 70: //space
                    Ctrl.rotate = false;
                    Ctrl.rotateReset = true;
                    break;
                case 16:
                    Ctrl.fire = false;
                    Ctrl.fireReset = true;
                    break;
                case 81:
                    Ctrl.debugReset = true;
                    break;
                case 37:
                    Ctrl.left = false;
                    Ctrl.leftReset = true;
                    break;
                case 39:
                    Ctrl.right = false;
                    Ctrl.rightReset = true;
                default:
                    break;


            }
        },
    };

    var SceneHandler = {
        init: function() {
            this.sceneList = [];
            this.currentScene - 1;
        },

        addScene: function(scene) {
            this.sceneList.push(scene);

        },

        setCurrentScene: function(search) {
            for (var i = 0; i < this.sceneList.length; i++) {
                if (this.sceneList[i].name == search) {
                    this.currentScene = i;
                    this.sceneList[i].init();
                }
            };
        }
    };

    var LevelRenderer = {
        init: function(x) {
            this.num = x;
            this.nodestate = [];
            this.nodeteams = [];
            this.nodetypes = [];
            this.nodelocations = [];
            this.pathstate = [];
            this.pathends = [];
            this.notresolvedCount = 0;
            this.firstGameOver = true;
            for (var i = 0; i < levelarray[x].nodes.length; i++) {
                this.nodestate.push(levelarray[x].nodes[i].state);
                this.nodeteams.push(levelarray[x].nodes[i].team);
                this.nodetypes.push(levelarray[x].nodes[i].nodeType);
                this.nodelocations.push({
                    x: levelarray[x].nodes[i].x,
                    y: levelarray[x].nodes[i].y,
                    /*xwobble: getRandomIntInclusive(-2,2),
                    ywobble: getRandomIntInclusive(-2,2),
                    xWobDir: getRandomIntInclusive(0,1),
                    yWobDir: getRandomIntInclusive(0,1)*/
                });
                if (levelarray[x].nodes[i].nodeType == "base" /*|| levelarray[x].nodes[i].nodeType == "firewall"*/)
                    this.notresolvedCount++;
            };
            this.notresolvedCount--;
            for (var i = 0; i < levelarray[x].paths.length; i++) {
                this.pathstate.push(levelarray[x].paths[i].state);
            };
        },
        updateNode: function(x, sender) {
            console.log("updating " + x + " from " + sender);
            switch (this.nodetypes[x]) {
                case "base":
                    if (!(this.nodeteams[x] === undefined)) {
                        Player.addKey(this.nodeteams[x]);
                    }
                    if (this.nodestate[x] == 4 && sender == Player.index) {
                        this.nodestate[Player.index] = 4;
                        Player.setIndex(x);
                        this.nodestate[x] = 0;
                    } else if (this.nodestate[x] != 4) {
                        if (Player.index != x) {
                            this.nodestate[x] = 4;
                            GameAudio.jukebox["hostup"].play();
                            this.notresolvedCount--;

                        }
                    }
                    break;
                case "broadcast":
                    var bList = getPathsForNode(x);
                    for (var i = 0; i < bList.length; i++) {
                        var indexInPathsList = bList[i];
                        var indexOfNeighbor = levelarray[Game.level].paths[indexInPathsList].a;
                        if (indexOfNeighbor == x) indexOfNeighbor = levelarray[Game.level].paths[indexInPathsList].b;
                        if (indexOfNeighbor != sender) LevelRenderer.updateNode(indexOfNeighbor, x);
                    }
                    break;
                case "pirate":
                    if (this.nodestate[x] == 1) {
                        Player.dead = true;
                        SceneHandler.setCurrentScene("TEXT-WALL");
                    } else {
                        this.nodestate[x]--;
                    }
                    break;
                case "firewall":
                    //if (Player.hasKey(this.nodeteams[x])) {
                    if(this.nodeteams[x] == undefined) {
                        this.nodetypes[x] = "broadcast";
                        this.nodestate[x] = 3;
                        //this.notresolvedCount--;
                        GameAudio.jukebox["hostup"].play();
                    }
                    break;
                case "receiver":
                    var rTeammates = getNodesFromTeam(this.nodeteams[x], x);
                    for (var j = 0; j < rTeammates.length; j++) {
                        var bList = getPathsForNode(rTeammates[j]);
                        for (var i = 0; i < bList.length; i++) {
                            var indexInPathsList = bList[i];
                            var indexOfNeighbor = levelarray[Game.level].paths[indexInPathsList].a;
                            if (indexOfNeighbor == x || indexOfNeighbor == rTeammates[j]) indexOfNeighbor = levelarray[Game.level].paths[indexInPathsList].b;
                            if (indexOfNeighbor != sender) LevelRenderer.updateNode(indexOfNeighbor, rTeammates[j]);
                        }
                    }
                    break;
                default:
                    break;
            }
        },
        updatePath: function() {
            //TODO
        },
        draw: function() {

            this.pathstate[Player.paths[Player.selected]] = 1;

            for (var i = 0; i < this.pathstate.length; i++) {
                if (i != Player.paths[Player.selected]) {
                    this.pathstate[i] = 0;
                    if (levelarray[this.num].paths[i].a == Player.index || levelarray[this.num].paths[i].b == Player.index) this.pathstate[i] = 2;
                }

                drawPath(i, this.pathstate[i]);
            }

            for (var i = 0; i < this.nodestate.length; i++) {
                drawNode(i, this.nodestate[i]);
            }
        },
    };
    
    function removeTeam(team, sender) {
        for (var i = 0; i < LevelRenderer.nodeteams.length; i++) {
            if (LevelRenderer.nodeteams[i] == team && (LevelRenderer.nodetypes[i] == "firewall" || LevelRenderer.nodetypes[i] == "base")) {
                LevelRenderer.nodeteams[i] = undefined;
                if (LevelRenderer.nodetypes[i] == "firewall") LevelRenderer.nodestate[i] = 3;
            }
        }
    }

    function drawNode(index, state) {
        var n = levelarray[LevelRenderer.num].nodes[index];

        AssetLoader.renderNode(LevelRenderer.nodelocations[index].x - 12,
            LevelRenderer.nodelocations[index].y - 12,
            state,
            LevelRenderer.nodetypes[index],
            LevelRenderer.nodeteams[index]);
        if (Ctrl.debug) {
            ctx.fillStyle = "#efefef";
            ctx.font = "10px Arial";
            ctx.fillText(n.name, LevelRenderer.nodelocations[index].x + 2, LevelRenderer.nodelocations[index].y + 20);
        }
    }

    function drawPath(index, state) {
        ctx.beginPath();
        var indexA = levelarray[Game.level].paths[index].a;
        var indexB = levelarray[Game.level].paths[index].b;
        var a = levelarray[Game.level].nodes[indexA];
        var b = levelarray[Game.level].nodes[indexB];

        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        switch (state) {
            case 0: // off 
                ctx.strokeStyle = "#404040";
                ctx.lineWidth = 2;
                break;
            case 1: // on 
                ctx.strokeStyle = "#47a1be";
                ctx.lineWidth = 5;
                break;
            case 2: // connected to player
                ctx.strokeStyle = "#bababa";
                ctx.lineWidth = 2;
        }
        ctx.stroke();

        if (Ctrl.debug) {
            var newx = (a.x + b.x) / 2;
            var newy = (a.y + b.y) / 2;
            ctx.fillStyle = "#efefef";
            ctx.font = "10px Arial";
            ctx.fillText(levelarray[Game.level].paths[index].name, newx - 10, newy - 10);
        }

    }

    function getNodesFromTeam(team, x) {
        var res = [];
        for (var i = 0; i < levelarray[Game.level].nodes.length; i++) {
            if (i != x && levelarray[Game.level].nodes[i].team == team && levelarray[Game.level].nodes[i].nodeType == "receiver") {
                res.push(i);
            }
        }
        return res;
    }

    function getPathsForNode(index) {
        var level = Game.level;
        var res = [];
        for (var i = 0; i < levelarray[level].paths.length; i++) {
            var path = levelarray[level].paths[i];
            if (path.a == index || path.b == index) {
                res.push(i);
                //LevelRenderer.pathstate[i] = 2;
            }
        }
        return res;
    }

    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.onload = function() {
        Game.setup();
    }
}());