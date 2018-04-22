(function() {

  var CURSOR_RADIUS = 20;
  var CANVAS_WIDTH = 480;
  var CANVAS_HEIGHT = 200;
  var canvas = document.querySelector('#canvas');

  if (canvas && document.documentElement.clientWidth > 1100) {
    var ctx = canvas.getContext('2d');
    var rect = canvas.getBoundingClientRect();
    var mousePosition = {};
    var balls = [];

    var drawBall = function (x, y, radius, color) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };

    var drawSquare = function (x, y, width, height, color) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };

    var onCanvasMouseMove = function (evt) {
      mousePosition = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    };

    var createRandomBallsSet = function (count) {
      var balls = [];
      for (var i = 0; i < count; i++) {
        var coorX = Math.random() * CANVAS_WIDTH;
        var coorY = Math.random() * CANVAS_HEIGHT;
        balls.push({
          x: coorX,
          y: coorY,
          originalX: coorX,
          originalY: coorY,
          vx: 0,
          vy: 0,
          friction: 0.91,
          springFactor: 0.05
        });
      }

      return balls;
    };

    var createSquareSet = function (width, countVertical, countHorizontal) {
      var items = [];

      for (var i = 0; i < countHorizontal; i++) {
        for (var j = 0; j < countVertical; j++) {
          var coorX =width + width * j;
          var coorY = width + width * i;
          items.push({
            x: coorX,
            y: coorY,
            originalX: coorX,
            originalY: coorY,
            vx: 0,
            vy: 0,
            friction: 0.91,
            springFactor: 0.04
          });
        }
      }

      return items;
    };

    var think = function (mousePos, ball) {
      var dx = ball.x - mousePos.x;
      var dy = ball.y - mousePos.y;

      var dist = Math.sqrt(dx * dx + dy * dy);


      if (dist < CURSOR_RADIUS) {
        var angle = Math.atan2(dy, dx);
        var tx = mousePos.x + Math.cos(angle) * CURSOR_RADIUS;
        var ty = mousePos.y + Math.sin(angle) * CURSOR_RADIUS;

        ball.vx += tx - ball.x;
        ball.vy += ty - ball.y;
      }

      var dx1 = -(ball.x - ball.originalX);
      var dy1 = -(ball.y - ball.originalY);

      ball.vx += dx1 * ball.springFactor;
      ball.vy += dy1 * ball.springFactor;

      ball.vx *= ball.friction;
      ball.vy *= ball.friction;

      ball.x += ball.vx;
      ball.y += ball.vy;

      return ball;
    };

    canvas.addEventListener('mousemove', onCanvasMouseMove);

    canvas.addEventListener('mouseout', function () {
      mousePosition = {
        x: 0,
        y: 0
      };
    });

    balls = createSquareSet(20, 22, 8);

    var render = function () {
      animationFrameId = window.requestAnimationFrame(render);
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawBall(mousePosition.x, mousePosition.y, CURSOR_RADIUS, '#fff');

      balls.forEach(function(ball) {
        think(mousePosition, ball);
        drawSquare(ball.x, ball.y, 20, 20, '#d9d9d9');
      });
    };

    render();
  }

})();