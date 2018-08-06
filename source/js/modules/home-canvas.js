
  const CURSOR_RADIUS = 20;
  const CANVAS_WIDTH = 480;
  const CANVAS_HEIGHT = 200;
  const canvas = document.querySelector('#canvas');

  if (canvas && document.documentElement.clientWidth > 1100) {
    let ctx = canvas.getContext('2d');
    let rect = canvas.getBoundingClientRect();
    let mousePosition = {};
    let balls = [];

    let drawBall = function (x, y, radius, color) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };

    let drawSquare = function (x, y, width, height, color) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };

    let onCanvasMouseMove = function (evt) {
      mousePosition = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    };

    let createRandomBallsSet = function (count) {
      let balls = [];
      for (let i = 0; i < count; i++) {
        let coorX = Math.random() * CANVAS_WIDTH;
        let coorY = Math.random() * CANVAS_HEIGHT;
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

    let createSquareSet = function (width, countVertical, countHorizontal) {
      let items = [];

      for (let i = 0; i < countHorizontal; i++) {
        for (let j = 0; j < countVertical; j++) {
          let coorX =width + width * j;
          let coorY = width + width * i;
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

    let think = function (mousePos, ball) {
      let dx = ball.x - mousePos.x;
      let dy = ball.y - mousePos.y;

      let dist = Math.sqrt(dx * dx + dy * dy);


      if (dist < CURSOR_RADIUS) {
        let angle = Math.atan2(dy, dx);
        let tx = mousePos.x + Math.cos(angle) * CURSOR_RADIUS;
        let ty = mousePos.y + Math.sin(angle) * CURSOR_RADIUS;

        ball.vx += tx - ball.x;
        ball.vy += ty - ball.y;
      }

      let dx1 = -(ball.x - ball.originalX);
      let dy1 = -(ball.y - ball.originalY);

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

    let render = function () {
      let animationFrameId = window.requestAnimationFrame(render);
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawBall(mousePosition.x, mousePosition.y, CURSOR_RADIUS, '#fff');

      balls.forEach(function(ball) {
        think(mousePosition, ball);
        drawSquare(ball.x, ball.y, 20, 20, 'rgba(208, 208, 208, 0.7)');
      });
    };

    render();
  }

