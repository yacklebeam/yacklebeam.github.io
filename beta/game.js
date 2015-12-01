(function () {
    window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame        ||
        window.webkitRequestAnimationFrame          ||
        window.mozRequestAnimationFrame             ||
        window.oRequestAnimationFrame               ||
        window.msRequestAnimationFrame              ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    var ctx = null;

    var Game = {
        canvas : document.getElementById('canvas'),

        setup : function() {
            if(this.canvas.getContext) {
                this.FrameCount = 0;
                ctx = this.canvas.getContext('2d');

                this.width = this.canvas.width;
                this.height = this.canvas.height;

                AssetLoader.load();
                TextRenderer.init();
                this.runGame();
            }
        },

        init: function() {
            Ctrl.init();
            SceneHandler.init();
            Screen.init();

            InvaderPool.init();
            BulletPool.init();
            Level.init();
            Hud.init();
            Gun.init();
            Ship.init();
        },

        animate: function() {
            Game.play = requestAnimFrame(Game.animate);
            Game.draw();
        },

        draw: function() {
            Screen.draw();

            this.FrameCount++;
            if(this.FrameCount > 99) this.FrameCount == 0;
        },

        runGame : function() {
            Game.init();
            Game.animate();
        }
    };

    var Screen = {
        init: function() {
            SceneHandler.createScene( 
                {   
                    name: "START-SCREEN",
                    draw: function() {
                        if(Ctrl.anyKey) {
                            SceneHandler.setCurrentScene('SCRIPT-1');
                            Ctrl.enterReset = false;
                        }
                        TextRenderer.renderText("@L@RSTAR CADET", 180, 290, -1);
                        TextRenderer.renderText("@L@YSTAR CADET", 181, 291, -1);
                        TextRenderer.renderText("@M@Wpress any key to start", 150, Game.height - 25, -1);
                    }
                }
            );

            SceneHandler.createScene( 
                {   
                    name: "SCRIPT-1",
                    draw: function() {
                        if(Ctrl.enter && Ctrl.enterReset) {
                            SceneHandler.setCurrentScene('SCRIPT-2');
                            Ctrl.enterReset = false;
                        }
                        TextRenderer.renderText("@M@CWELCOME, PILOT", 210, 290, 200);
                        TextRenderer.renderText("@M@Wpress \"shift\" to continue", 150, Game.height - 25, -1);
                    }
                }
            );

            SceneHandler.createScene( 
                {
                    name: "SCRIPT-2",
                    draw: function() {
                        if(Ctrl.enter && Ctrl.enterReset) {
                            SceneHandler.setCurrentScene('SCRIPT-3');
                            Ctrl.enterReset = false;
                        }
                        TextRenderer.renderText("@M@Cyou have been chosen for a very special mission...", 150, 290, 300);
                        TextRenderer.renderText("@M@Wpress \"shift\" to continue", 150, Game.height - 25, -1);
                    }
                }
            );

            SceneHandler.createScene( 
                {
                    name: "SCRIPT-3",
                    draw: function() {
                        if(Ctrl.enter && Ctrl.enterReset) {
                            SceneHandler.setCurrentScene('GAME-LEVEL-1');
                            Ctrl.enterReset = false;
                        }
                        TextRenderer.renderText("@M@Cthe @RRektarin @Cfleet approaches Earth.@N@NYou have been chosen to stop them.@N@Nthis should be an easy task...", 150, 250, 300);
                        TextRenderer.renderText("@M@Wpress \"shift\" to begin", 150, Game.height - 25, -1);
                    }
                }
            );

            SceneHandler.createScene( 
                {
                    name: "GAME-LEVEL-1",
                    draw: function() {
                        InvaderPool.draw();
                        Ship.draw();
                        BulletPool.draw();
                        Hud.draw();
                    }
                }
            );

            SceneHandler.createScene( 
                {
                    name: "GAME-OVER-WIN",
                    draw: function() {
                        TextRenderer.renderText("@L@GGAME OVER@N@N@M [FINAL SCORE:"+Hud.score+"]", 190, 290, -1);
                    }
                }
            );

            SceneHandler.setCurrentScene("START-SCREEN");
        },

        draw: function() {
            ctx.clearRect(  0,0,Game.width,Game.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(   0,0,Game.width,Game.height);
            var Scene = SceneHandler.sceneList[SceneHandler.currentScene];
            Scene.draw();
        }
    };

    var AssetLoader = {
        load: function() {
            this.AlphabetSmall = new Image();
            this.AlphabetSmall.src = 'res/chars-small.png';
            this.AlphabetMedium = new Image();
            this.AlphabetMedium.src = 'res/chars-med.png';
            this.AlphabetLarge = new Image();
            this.AlphabetLarge.src = 'res/chars-large.png';
            this.hSeg = new Image();
            this.hSeg.src = 'res/heath_segment.png';
            this.hSegEmpty = new Image();
            this.hSegEmpty.src = "res/heath_segment_empty.png";
            this.sSeg = new Image();
            this.sSeg.src = "res/shield_segment.png";
            this.sSegEmpty = new Image();
            this.sSegEmpty.src = "res/shield_segment_empty.png";
            this.hudLeft = new Image();
            this.hudLeft.src = 'res/hud_left.png';
            this.hudRight = new Image();
            this.hudRight.src = 'res/hud_right.png';
        }
    };

    var SceneHandler = {
        init: function() {
            this.sceneList = [];
            this.currentScene = -1;
        },

        createScene: function(scene) {
            this.sceneList.push(scene);
        },

        setCurrentScene: function(nameIn) {
            for(var i = 0; i < this.sceneList.length; i++) {
                if(this.sceneList[i].name == nameIn) {
                    this.currentScene = i;
                    return;
                }
            }
        },

        clearScenes: function() {
            this.sceneList = [];
        }
    };

    var TextRenderer = {
        init: function() {
            this.CharMap = ['A','B','C','D','E','F','G','H','I','J',
                            'K','L','M','N','O','P','Q','R','S','T',
                            'U','V','W','X','Y','Z','.',',','-','!',
                            '?','_','(',')','[',']','/','\\',':',';',
                            '#','$','%','+','=','<','>','"','\'','|',
                            '1','2','3','4','5','6','7','8','9','0'];

            this.SmallText = {
                src: AssetLoader.AlphabetSmall,
                space: 5,

            };

            this.MedText = {
                src: AssetLoader.AlphabetMedium,
                space: 10,
                
            };

            this.LargeText = {
                src: AssetLoader.AlphabetLarge,
                space: 20,
                
            };
        },

        getIndexFromChar: function(c) {
            for(var i = 0; i < this.CharMap.length; i++) {
                if(c == this.CharMap[i]) return i;
            }

            return -1;
        },

        renderText: function(textIn, x, y, max_width) {
            var text = textIn.toUpperCase();
            var color = 0;
            var Font = this.MedText;
            var X = x;
            var Y = y;

            for(var i = 0; i < text.length; i++) {
                if(text.charAt(i) == '@') { //change text
                    if(text.charAt(i+1) == 'S') Font = this.SmallText;
                    if(text.charAt(i+1) == 'M') Font = this.MedText;
                    if(text.charAt(i+1) == 'L') Font = this.LargeText;
                    if(text.charAt(i+1) == 'G') color = 2;
                    if(text.charAt(i+1) == 'R') color = 3;
                    if(text.charAt(i+1) == 'B') color = 1;
                    if(text.charAt(i+1) == 'W') color = 0;
                    if(text.charAt(i+1) == 'Y') color = 4;
                    if(text.charAt(i+1) == 'P') color = 5;
                    if(text.charAt(i+1) == 'C') color = 6;
                    if(text.charAt(i+1) == 'N') {
                        Y += Font.space+(Font.space/5);
                        X = x;
                    }

                    i+=1;
                    continue;
                }

                var charCode = this.getIndexFromChar(text.charAt(i));
                var colorOffset = color * 6 * Font.space;

                if(charCode >= 0) {
                    var sx = charCode % 10;
                    var sy = Math.floor(charCode / 10);
                    ctx.drawImage(Font.src, sx*Font.space, colorOffset+sy*Font.space, Font.space, Font.space, X, Y, Font.space, Font.space);
                    X += Font.space+(Font.space/5);                    
                } else {//space, usually
                    X += Font.space+(Font.space/5);
                    var nextSpace = text.indexOf(' ', i+1);
                    if(nextSpace == -1) nextSpace = text.length;

                    var wordLen = (nextSpace - i) * (Font.space+(Font.space/5));
                    if(X - x + wordLen > max_width && max_width > 0) {
                        Y += Font.space+(Font.space/5);
                        X = x;                    
                    }
                }
            }
        }
    };

    var Level = {
        init: function() {
            this.loadLevel(0);
        },

        loadLevel: function(level) {
            switch(level) {
                case 0:
                    Hud.goal = 20;
                    for(var i = 0; i < 20; i++) {
                        var newInvader = {
                            life: 1,
                            x: 200 + (i%10) * 25,
                            y: 0 - 25 * Math.floor(i / 10),
                            dead: false,
                            type: "ship"
                        };
                        InvaderPool.addNew(newInvader);
                    }
                    break;
            }
        }
    };

    var Gun = {
        init: function() {
            this.setGun(0);
        },

        setGun: function(id) {
            switch(id) {
                case 0:
                    this.dmg = 1;
                    this.r = 10;
                    this.bulletCount = 1;
                    this.bulletSpread = 1;
                    this.fireRate = 10;
                    this.color = 'red';
                    break;
                case 1:
                    this.dmg = 2;
                    this.r = 15;
                    this.bulletCount = 3;
                    this.bulletSpread = 1;
                    this.fireRate = 5;
                    this.color = 'red';
                    break;
                default:
                    break;
            }
        },

        getBulletDirection: function(bulletCount, i) {
            if(i < (Math.floor(bulletCount / 2))) return (i - Math.floor(bulletCount / 2));
            else return (i - Math.floor(bulletCount / 2) + 1);
        },

        shoot: function() {
            if(this.bulletCount % 2 == 0) {
                for(var i = 0; i < this.bulletCount; i++) {
                    var newBullet = {
                        faction: 0,
                        x: Ship.x + 2 * this.getBulletDirection(this.bulletCount, i),
                        y: Ship.y - 15,
                        xs: this.bulletSpread * this.getBulletDirection(this.bulletCount, i),
                        ys: -15,
                        r: this.r,
                        dmg: this.dmg,
                        color: this.color
                    };
                    BulletPool.addNew(newBullet);
                }
            } else {
                for(var i = 0; i < this.bulletCount; i++) {
                    var newBullet = {
                        faction: 0,
                        x: Ship.x + 2 * (i - (Math.floor(this.bulletCount / 2))),
                        y: Ship.y - 15,
                        xs: this.bulletSpread * (i - (Math.floor(this.bulletCount / 2))),
                        ys: -15,
                        r: this.r,
                        dmg: this.dmg,
                        color: this.color
                    };
                    BulletPool.addNew(newBullet);
                }
            }
        }
    };

    var Ship = {
        w: 20,
        h: 20,
        point1 : {x: 0, y: -25},
        point2 : {x: -10, y: 0},
        point3 : {x: 10, y: 0},
        point4 : {x: 0, y: 0},
        
        init: function() {
            this.resetTimer = Gun.fireRate;
            this.x = 290;
            this.y = 575;
            this.speed = 8;
            this.health = 4;
            this.shields = 8;
        },

        draw: function() {
            if(Game.gameOver) return;
            this.move();

            ctx.beginPath();
            ctx.moveTo(this.x + this.point1.x, this.y + this.point1.y);
            ctx.lineTo(this.x + this.point2.x, this.y + this.point2.y);
            ctx.lineTo(this.x + this.point3.x, this.y + this.point3.y);
            ctx.closePath();
            ctx.fillStyle = '#eee';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x + this.point4.x,this.y + this.point4.y, 3, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = 'orange';
            ctx.fill();
        },

        move: function() {
            if (Ctrl.left && this.x > 120) {
                this.x += -this.speed;
            } else if (Ctrl.right && this.x < 480) {
                this.x += this.speed;
            }

            if(this.x > 700) this.x = 500;
            if(this.x < 100) this.x = 100;

            if(Ctrl.enter) {
                if(this.resetTimer == 0) {
                    this.shoot();
                    this.resetTimer = Gun.fireRate;
                }
                this.resetTimer--;
            }
        },

        shoot: function() {
            Gun.shoot();
            //Ctrl.fire = false;
            //Ctrl.fireReset = true;
        },

        hit: function(dmg) {
            this.shields -= dmg;
            if(this.shields < 0) {
                this.health += this.shields;
                this.shields = 0;
            }
            
            ctx.clearRect(0, 0, Game.width, Game.height);
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, Game.width, Game.height);

            if(this.health == 0) {
                Game.gameOver = true;
                Screen.gamelose();
                Game.canvas.addEventListener('click', Game.restartGame, false);
                return;
            }
        }

    };

    var BulletPool = {
        init: function() {
            this.maxSize = 100;
            this.count = 0;
            this.objects = [];
            this.open = 0;
            this.end = 0;
        },

        draw: function() {
            if(Game.gameOver) return;
            for(var i = 0; i < this.end; i++) {
                var bullet = this.objects[i];
                if(bullet) {
                    bullet.x += bullet.xs;
                    bullet.y += bullet.ys;
            
                    ctx.beginPath();
                    ctx.arc(bullet.x, bullet.y, bullet.r, 0, 2 * Math.PI);
                    ctx.closePath();

                    ctx.fillStyle = bullet.color;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(bullet.x, bullet.y, bullet.r - 4, 0, 2 * Math.PI);
                    ctx.closePath();

                    ctx.fillStyle = 'white';
                    ctx.fill();

                    if(bullet.y < -5) {
                        this.removeIndex(bullet.index);
                    }
                }
            }

            this.collide();
        },

        addNew: function(ob) {
            if(this.open == this.end) {
                ob.index = this.open;
                this.objects.push(ob);
                this.end++;
                this.open++;
            } else {
                ob.index = this.open;
                this.objects[this.open] = ob;
                this.open = this.getOpenIndex();
            }
        },

        removeIndex: function(index) {
            this.objects[index] = null;
            if(index < this.open) this.open = index;
        },

        collide: function() {
            for(var i = 0; i < this.end; i++) {
                var Bullet = this.objects[i];
                if(Bullet) {
                    //Check '1' bullets for ship collisions
                    if(Bullet.faction == 1) {
                        if(Math.sqrt((Ship.x - Bullet.x) * (Ship.x - Bullet.x) + (Ship.y - Bullet.y) * (Ship.y - Bullet.y)) < 15) {
                            Ship.hit(Bullet.dmg);
                            this.removeIndex(Bullet.index);
                            break;
                        }
                    } 


                    //Check '0' bullets for invader collisions
                    for(var j = 0; j < InvaderPool.end; j++) {
                        var Invader = InvaderPool.objects[j];
                        if((Bullet.faction == 0) && Invader && !Invader.dead) {
                            if(Math.sqrt((Invader.x - Bullet.x) * (Invader.x - Bullet.x) + (Invader.y - Bullet.y) * (Invader.y - Bullet.y)) < 15) {
                                this.removeIndex(Bullet.index);
                                InvaderPool.objects[j].life -= Bullet.dmg;
                                if(InvaderPool.objects[j].life <= 0) {
                                    InvaderPool.removeIndex(Invader.index);
                                    //InvaderPool.objects[j].dead = true;
                                    Hud.goal--;
                                    Hud.score++;
                                }
                               if(Hud.goal == 0) {
                                    //Game.gameOver = true;
                                    //Screen.gamewin();
                                    //Game.canvas.addEventListener('click', Game.restartGame, false);
                                    //Level.loadLevel(1);
                                    SceneHandler.setCurrentScene('GAME-OVER-WIN');
                                    return;
                                }
                                break;
                            }
                        }
                    }
                }
            }
        },

        getOpenIndex: function() {
            for(var i = 0; i < this.end; i++) {
                if(this.objects[i] == null) return i;
            }
            return this.end;
        }
    };

    var InvaderPool = {
        init: function() {
            this.bossReset = 20; //MOVE THIS
            this.maxSize = 100;
            this.count = 0;
            this.objects = [];
            this.open = 0;
            this.end = 0;
            this.left = true;//MOVE THIS
        },

        draw: function() {
            //Hud.level = this.end;
            if(Game.gameOver) return;
            for(var i = 0; i < this.end; i++) {
                var A = this.objects[i];

                if(A) {
                    //Move this code into object, rather than pool
                    if(A.type == "ship") {
                        A.y += 1;

                        ctx.beginPath();
                        ctx.moveTo(A.x, A.y + 15);
                        ctx.lineTo(A.x - 10, A.y - 10);
                        ctx.lineTo(A.x + 10, A.y - 10);
                        ctx.closePath();
                        if(A.life == 1) ctx.fillStyle = '#eee';
                        if(A.life == 2) ctx.fillStyle = 'blue';
                        ctx.fill();
                    }
                    else {
                        if(A.y < 100) A.y += 1;
                        else {
                            if(this.left) A.x += 1;
                            else A.x -= 1;

                            if(A.x == 450) this.left = false;
                            if(A.x == 150) this.left = true;
                        }
                
                        ctx.beginPath();
                        ctx.moveTo(A.x, A.y + 25);
                        ctx.lineTo(A.x - 20, A.y - 20);
                        ctx.lineTo(A.x + 20, A.y - 20);
                        ctx.closePath();
                        ctx.fillStyle = '#eee';
                        ctx.fill();

                        this.bossReset--;

                        if(this.bossReset == 0) {
                            this.bossReset = 20;
                            var newBullet = {
                                faction: 1,
                                x: A.x,
                                y: A.y + 25,
                                xs: 0,
                                ys: 10,
                                r: 12,
                                dmg: 1,
                                color: 'orange'
                            };
                            BulletPool.addNew(newBullet);
                        }
                    }

                    /*if(A.y > Game.height - 30) {
                        Game.gameOver = true;
                        Screen.gamelose();
                        Game.canvas.addEventListener('click', Game.restartGame, false);
                        return;
                    }*/
                    if(A.y == Game.height + 5) {
                        this.removeIndex(A.index);
                    }
                }
            }
        },

        addNew: function(ob) {
            if(this.open == this.end) {
                ob.index = this.open;
                this.objects.push(ob);
                this.end++;
                this.open++;
            } else {
                ob.index = this.open;
                this.objects[this.open] = ob;
                this.open = this.getOpenIndex();
            }
        },

        removeIndex: function(index) {
            this.objects[index] = null;
            if(index < this.open) this.open = index;
        },

        getOpenIndex: function() {
            for(var i = 0; i < this.end; i++) {
                if(this.objects[i] == null) return i;
            }
            return this.end;
        }
    };

    var Hud = {
        init: function() {
            this.mainMenu = [
            {
                text: "GUN 1",
                cmd: function() {
                    Gun.setGun(0);
                    Game.MenuOpen = false;
                }
            },
            {
                text: "GUN 2",
                cmd: function() {
                    Gun.setGun(1);
                    Game.MenuOpen = false;
                }
            }];
            this.level = 0;
            this.score = 0;
            this.menux = 200;
            this.menuy = 200;
            this.gunLevel = 0;
            this.selected = 0;

            //this.ready = false;

            this.hSeg = new Image();
            this.hSeg.src = 'heath_segment.png';
            this.hSegEmpty = new Image();
            this.hSegEmpty.src = "heath_segment_empty.png";
            this.sSeg = new Image();
            this.sSeg.src = "shield_segment.png";
            this.sSegEmpty = new Image();
            this.sSegEmpty.src = "shield_segment_empty.png";
            this.hudLeft = new Image();
            this.hudLeft.src = 'hud_left.png';
            this.hudRight = new Image();
            this.hudRight.src = 'hud_right.png';

            /*this.hSeg.onload = function() {
                this.ready = true;
            }*/
        },

        draw: function() {
            if(Game.gameOver) return;
            ctx.drawImage(AssetLoader.hudLeft, 0, 0);
            ctx.drawImage(AssetLoader.hudRight, Game.width - 100, 0);

            ctx.font = '12px helvetica, arial';
            ctx.fillStyle = '#befbff';
            ctx.textAlign = 'left';
            ctx.fillText('Score: ' + this.score, 12, Game.height - 60);
            ctx.textAlign = 'left';
            ctx.fillText('Level: ' + this.level, 12, Game.height - 75);
            for(var i = 0; i < 4; i++) {
                var LostHealth = 4 - Ship.health;
                if(i < LostHealth) {
                    ctx.drawImage(AssetLoader.hSegEmpty, 14, 10 + i * 80);
                } else {
                    ctx.drawImage(AssetLoader.hSeg, 14, 10 + i * 80);
                }
            }

            for(var i = 0; i < 8; i++) {
                var LostShields = 8 - Ship.shields;
                if(i < LostShields) {
                    ctx.drawImage(AssetLoader.sSegEmpty, 36, 77 + i * 30);
                } else {
                    ctx.drawImage(AssetLoader.sSeg, 36, 77 + i * 30);
                }
            }
        }
    };

    var Ctrl = {
        init: function() {
            Ctrl.leftReset = true;
            Ctrl.rightReset = true;
            Ctrl.enterReset = true;
            window.addEventListener('keydown', this.keyDown, true);
            window.addEventListener('keyup', this.keyUp, true);
        },

        keyDown: function(event) {
            Ctrl.anyKey = true;
            switch(event.keyCode) {
                case 65: //A
                    Ctrl.left = true;
                    break;
                case 68: //D
                    Ctrl.right = true;
                    break;
                case 16://shift
                    Ctrl.enter = true;
                    break;
                default:
                    break;
            }
        },

        keyUp: function(event) {
            Ctrl.anyKey = false;
            switch(event.keyCode) {
                case 65: //A
                    Ctrl.left = false;
                    Ctrl.leftReset = true;
                    break;
                case 68: //D
                    Ctrl.right = false;
                    Ctrl.rightReset = true;
                    break;
                case 16:
                    Ctrl.enter = false;
                    Ctrl.enterReset = true;
                    break;
                default:
                    break;
            }
        }
    };

    //TODO REMOVE
    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.onload = function() {
        Game.setup();
    }
}());