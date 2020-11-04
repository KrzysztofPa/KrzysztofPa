//Script made by Eshill - https://codepen.io/eshill

const onDomReadyFunction = function () {
    backgroundAnimation();
    const hidePreLoader = function () {
        const preloader = document.querySelector('.preloader')
        preloader.style['opacity'] = 0;
        preloader.querySelector('.rectBox').style['opacity'] = 0;
        setTimeout(() => {
                preloader.remove()
                document.querySelector('.goDown').classList.add('animate__animated', 'animate__bounce')
            },
            2000);
    };
    setTimeout(hidePreLoader, 500);

}

const backgroundAnimation = function () {
    let circles = [],
        canvas = document.getElementById("background"),
        context = canvas.getContext("2d"),
        colors = ['rgba(219, 213, 210, .6)'],
        minSize = 1,
        maxSize = 5,
        numCircles = 100,
        minSpeed = -2,
        maxSpeed = 1,
        expandState = true;

    function buildArray() {
        for (var i = 0; i < numCircles; i++) {
            var color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1,
                left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
                top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
                size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
                leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
                topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
                expandState = expandState;

            while (leftSpeed == 0 || topSpeed == 0) {
                leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
                    topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
            }
            var circle = {
                color: color,
                left: left,
                top: top,
                size: size,
                leftSpeed: leftSpeed,
                topSpeed: topSpeed,
                expandState: expandState
            };
            circles.push(circle);
        }
    }

    function build() {
        for (var h = 0; h < circles.length; h++) {
            var curCircle = circles[h];
            context.fillStyle = colors[curCircle.color - 1];
            context.beginPath();
            if (curCircle.left > canvas.width + curCircle.size) {
                curCircle.left = 0 - curCircle.size;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            } else if (curCircle.left < 0 - curCircle.size) {
                curCircle.left = canvas.width + curCircle.size;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            } else {
                curCircle.left = curCircle.left + curCircle.leftSpeed;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            }

            if (curCircle.top > canvas.height + curCircle.size) {
                curCircle.top = 0 - curCircle.size;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);

            } else if (curCircle.top < 0 - curCircle.size) {
                curCircle.top = canvas.height + curCircle.size;
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            } else {
                curCircle.top = curCircle.top + curCircle.topSpeed;
                if (curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == false) {
                    curCircle.size = curCircle.size - 0.1;
                } else if (curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == true) {
                    curCircle.size = curCircle.size + 0.1;
                } else if (curCircle.size == maxSize && curCircle.expandState == true) {
                    curCircle.expandState = false;
                    curCircle.size = curCircle.size - 0.1;
                } else if (curCircle.size == minSize && curCircle.expandState == false) {
                    curCircle.expandState = true;
                    curCircle.size = curCircle.size + 0.1;
                }
                context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
            }

            context.closePath();
            context.fill();
            context.ellipse;
        }
    }


    var xVal = 0;

    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function animate() {
        var canvas = document.getElementById("background"),
            context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        xVal++;
        build();
        requestAnimFrame(function () {
            animate();
        });
    }
    window.onload = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        buildArray();
        animate();
    };


    window.onresize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animate();
    };

    var tester = document.getElementById('tester');
var wrapper = document.getElementById('wrapper');

window.onscroll = function() {
  wrapper.style.backgroundColor = checkVisible(tester) ? '#4f4' : '#f44';
};

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
    
}
window.addEventListener('DOMContentLoaded', onDomReadyFunction);