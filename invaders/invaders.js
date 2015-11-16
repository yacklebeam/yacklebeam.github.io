//Canvas Space Invaders
//Jacob Troxel
//WIP

(function () {
    window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame        ||
        window.webkitRequestAnimationFrame          ||
        window.mozRequestAnimationFrame             ||
        window.oRequestAnimationFrame               ||
        window.msRequestAnimationFrame              ||
        function(callback) {
            window.setTimeout(callback, 1000 / 30);
        };
    })();

    var ctx = null;

    var Game = {
        canvas : document.getElementById('invaders'),

        setup : function() {
            if(this.canvas.getContext) {
                ctx = this.canvas.getContext('2d');

                this.width = this.canvas.width;
                this.height = this.canvas.height;

                Screen.welcome();
                this.canvas.addEventListener('click', this.runGame, false);
                Ctrl.init();
            }
        },

        init: function() {
            this.gameOver = false;
            Background.init();
            //Hud.init();
            //Asteroids.init();
            Bullets.init();
            Ship.init();
        },

        animate: function() {
            Game.play = requestAnimFrame(Game.animate);
            Game.draw();
        },

        draw: function() {
            if(!Game.gameOver) {
                ctx.clearRect(0, 0, this.width, this.height);

                Background.draw();
                //Hud.draw();
                //Asteroids.draw();
                Ship.draw();
                Bullets.draw();
            }
        },

        runGame : function() {
            Game.canvas.removeEventListener('click', Game.runGame, false);
            Game.init();
            Game.animate();
        }
    };

    var Screen = {
        welcome : function() {
            this.text = 'SPACE INVADERS';
            this.textSub = 'Click to Start';
            this.textColor = 'white';

            this.create();
        },

        create : function() {
            ctx.fillStyle = '#091122';
            ctx.fillRect(0, 0, Game.width, Game.height);

            ctx.fillStyle = this.textColor;
            ctx.textAlign = 'center';
            ctx.font = '40px helvetica, arial';
            ctx.fillText(this.text, Game.width / 2, Game.height / 2);

            ctx.fillStyle = '#999999';
            ctx.font = '20px helvetica, arial';
            ctx.fillText(this.textSub, Game.width / 2, Game.height / 2 + 30);
        }
    };

    var Background = {
        init: function() {
            this.ready = false;

            this.img = new Image();
            this.img.src = 'background.jpg';
            this.img.onload = function() {
                Background.ready = true;
            };
        },

        draw: function() {
            if (this.ready) {
                ctx.drawImage(this.img, 0, 0);
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
            this.x = 290;
            this.y = 590;
            this.speed = 4;
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
            if (Ctrl.left && this.x < 500) {
                this.x += this.speed;
            } else if (Ctrl.right && this.x > 100) {
                this.x += -this.speed;
            }

            if(this.x > 700) this.x = 500;
            if(this.x < 100) this.x = 100;

            if(Ctrl.fire) {
                Bullets.addBullet();
                Ctrl.fire = false;
                Ctrl.fireReset = true;
            }
        }

    };

    var Bullets = {
        count : 100,
        current : 0,

        init : function() {
            this.ents = [this.count];
        },

        draw : function() {
            if(Game.gameOver) return;
            var i;
            for(i = 0; i < this.count; i++) {
                var B = this.ents[i];

                if(B) {

                    B.x += B.xs;
                    B.y += B.ys;

                    this.collide(i);
                
                    ctx.beginPath();
                    ctx.arc(B.x, B.y, B.r, 0, 2 * Math.PI);
                    ctx.closePath();

                    ctx.fillStyle = '#eee';
                    ctx.fill();

                    if(B.y < -5) {
                        this.ents[i] = null;
                        this.current--;
                    }
                }
            }
        },

        collide : function(index) {
        },

        addBullet : function() {
            if(this.current === this.count) return;
            else {
                var open;
                var i;
                for(i = 0; i < this.count; i++)
                {
                    if(this.ents[i] == null)
                    {
                        open = i;
                        break;
                    };
                }
                this.ents[open] = {
                    x : Ship.x,
                    y : Ship.y - 25,
                    r : 3,
                    xs : 0,
                    ys : -10
                };
                this.current++;
            }
        }

    };

    var Ctrl = {
        fireReset : false,
        init: function() {
            window.addEventListener('keydown', this.keyDown, true);
            window.addEventListener('keyup', this.keyUp, true);
        },

        keyDown: function(event) {
            switch(event.keyCode) {
                case 39: // Left
                    Ctrl.left = true;
                    break;
                case 37: // Right
                    Ctrl.right = true;
                    break;
                case 87: //Space
                    if(Ctrl.fireReset == false) Ctrl.fire = true;
                    break;
                default:
                    break;
            }
        },

        keyUp: function(event) {
            switch(event.keyCode) {
                case 39: // Left
                    Ctrl.left = false;
                    break;
                case 37: // Right
                    Ctrl.right = false;
                    break;
                case 87: //Space
                    Ctrl.fireReset = false;
                    break;
                default:
                    break;
            }
        }
    };

    window.onload = function() {
        Game.setup();
    }
}());