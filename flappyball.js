var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 20;
var color = "#FFC0CB";
var g = 0.08; // acceleration due to gravity
var x = 100; // initial horizontal position
var y = 200; // initial vertical position
var vx = 0; // initial horizontal speed
var vy = 0; // initial vertical speed

var rlo = canvas.width;
var rsp = 0.8;
var uppilen;
var pipewide = 50;
var k;

var j1 = x + radius;
var j2 = x - radius - pipewide;

var cents = 0;
var cflag = 0;

var gamestart;

window.onload = init;
function init() {
    gamestart = setInterval(onEachStep, 1); // 60 fps
};

function onEachStep() {
    vy += g; // gravity increases the vertical speed
    x += vx; // horizontal speed increases horizontal position
    y += vy; // vertical speed increases vertical position
    if (y > canvas.height - radius) { // if ball hits the ground
        y = canvas.height - radius; // reposition it at the ground
        vy *= -0.8; // then reverse and reduce its vertical speed
    }
    if (x > canvas.width - radius) { // if ball goes beyond canvas
        x = canvas.width - radius;
        //x = -radius; // wrap it around
        vx *= -0.5;
    }
    if (y < radius) { // if ball goes beyond canvas
        y = radius;
        //x = -radius; // wrap it around
        vy *= -0.8;
    }
    if (x < radius) { // if ball goes beyond canvas
        x = radius;
        //x = -radius; // wrap it around
        vx *= -0.5;
    }

    rlo -= rsp;
    if (rlo < - pipewide) {
        rlo = canvas.width;
        uppilen = Math.floor(Math.random() * 4) + 1;
    }

    drawBall(); // draw the ball
    deathJugde();
    countCent();
};
function drawBall() {
    with (context) {
        clearRect(0, 0, canvas.width, canvas.height);
        beginPath();
        fillStyle = color;
        arc(x, y, radius, 0, 2 * Math.PI, true);
        closePath();
        fill();
        beginPath();
        fillStyle = "#9ACD32";
        fillRect(rlo, 0, pipewide, uppilen * 100);
        k = (uppilen + 2) * 100;
        fillRect(rlo, k, pipewide, canvas.height - k);
        closePath();
        fill();
    };
};
function clickEvent(){
    vy = 0;
    vy = -4.5;
    vx = 0;
    x = 100;
};
function countCent(){
    with (context){
        //clearRect(0, 0, canvas.width, canvas.height);
        beginPath();
        fillStyle = "#FFD700";
        strokeStyle = "#FFD700"; //设置笔触的颜色
        textAlign = 'center';
        font = "bold 50px '字体','字体','微软雅黑','宋体'"; //设置字体
        textBaseline = 'hanging'; //在绘制文本时使用的当前文本基线
        fillText(cents ,canvas.width/2 ,40);
        closePath();
        fill();
    }
}
function deathMess(){
    with (context){
        //clearRect(0, 0, canvas.width, canvas.height);
        beginPath();
        fillStyle = "#DC143C";
        strokeStyle = "#DC143C"; //设置笔触的颜色
        textAlign = 'center';
        font = "bold 25px '字体','字体','微软雅黑','宋体'"; //设置字体
        textBaseline = 'hanging'; //在绘制文本时使用的当前文本基线
        fillText("刚刚得了"+cents+"分 厉害捏~" ,canvas.width/2 ,300);
        closePath();
        fill();
    }
}
function gameOver(){
    clearInterval(gamestart);
    deathMess();
    setTimeout("alert('重开？');location.reload();", 1000);
}
function deathJugde(){
    if((rlo <= j1)&&(rlo >= j2)){
        if((y <= uppilen*100 + radius)||(y >= k-radius)) gameOver();
    }
    if (Math.floor(rlo) == x) {
        if(cflag ==  1) cents++;
        cflag = 1;
    }
}