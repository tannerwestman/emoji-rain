;(function() {

	function Game (canvasId) {
		var canvas = document.getElementById(canvasId);
		canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
		var screen = canvas.getContext('2d');
		var size = { x: canvas.width, y: canvas.height };
		var drops = 1;

		this.size = size;

		// wave back and forth
		this.incrementX = Math.PI * 2 / 1000;
		this.counterX = 0;
		this.offsetX = 0;
		
		// drop image
		this.drop = new Image();
		this.drop.src = 'angry.png';

		// create bodies array to hold player, obstacles etc
		this.bodies = [];

		for(var i = 0; i < drops; i++) {
			this.bodies = this.bodies.concat(new Drop(this,this.size));
		}

		// animation stuff

		var self = this;
		var tick = function() {
			self.update();
			self.draw(screen,self.size);
			requestAnimationFrame(tick);
		}

		tick();
	};

	// runs and updates game logic
	Game.prototype.update = function() {
		var self = this;
		self.offsetX = Math.sin(self.counterX) / 2;
		self.counterX += self.incrementX;

		// update all the bodies
		for(var i = 0; i < this.bodies.length; i++) {
   	    	this.bodies[i].update();
		}

		// get rid of things that are no longer on the canvas
   		this.bodies = this.bodies.filter(function(e) {
   			return e.center.y < self.size.y;
   		});

   		Math.random() > 0.85 ? this.bodies = this.bodies.concat(new Drop(this,this.size)) : false;
	};

	// draws game elements
	Game.prototype.draw = function(screen,size) {
		screen.clearRect(0,0,size.x,size.y);

		// draw all the bodies
		for(var i = 0; i < this.bodies.length; i++) {
			drawImg(screen,this.bodies[i],this.drop);
			//drawRect(screen,this.bodies[i]);
		}

	};

	Game.prototype.resize = function(h,w) {
		this.size.x = w;
		this.size.y = h;
	}

	function Drop(game,size) {
		this.game = game;
		this.canSize = size;

		this.center = { x:Math.floor(Math.random()*this.game.size.x), y:Math.floor(Math.random()*100)-30  };
		this.size = { x:10, y:10 };
		this.velocity = 0.5 + Math.random();
	}

	Drop.prototype.update = function () {
		this.center.y += this.velocity;
		this.center.x += this.game.offsetX;
		console.log()
	}


	function drawImg(screen,body,img) {
		screen.drawImage(img,body.center.x - body.size.x / 2, body.center.y - body.size.y / 2);
	}

	
    var game;
	// when DOM is ready start the game!
	window.onload = function() {
			game = new Game("drawing");
	};

})();