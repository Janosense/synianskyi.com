let particlesConfig = {};
let windowWidth = document.documentElement.clientWidth;

if (windowWidth > 1400) {
  particlesConfig = {
    number: 290,
    size: 10,
    speed: 4
  };
} else if (windowWidth > 1023) {
  particlesConfig = {
    number: 210,
    size: 9,
    speed: 4
  };
} else if (windowWidth > 767) {
  particlesConfig = {
    number: 170,
    size: 8,
    speed: 4
  };
} else {
  particlesConfig = {
    number: 100,
    size: 6,
    speed: 3
  };
}

particlesJS('particles', {
  "particles": {
    "number": {
      "value": particlesConfig.number,
      "density": {
        "enable": false,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#999999"
    },
    "shape": {
      "type": "edge",
      "stroke": {
        "width": 0,
        "color": "#999999"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.2,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": particlesConfig.size,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 80,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": particlesConfig.speed,
      "direction": "bottom-right",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 800,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 800,
        "size": 80,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 50,
        "duration": 0.1
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});