const taskId = localStorage.getItem("taskId");

let canvas, ctx;
let scale = 1, offsetX = 0, offsetY = 0;
let isDragging = false;
let boxes = [];
let mode = "box";

window.onload = async () => {
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

resize();

const { data } = await sb.from("ant_tasks")
.select("*").eq("id", taskId).single();

const img = new Image();
img.src = data.imgdata;

img.onload = () => {
draw(img);
};

canvas.onwheel = (e)=>{
scale *= e.deltaY < 0 ? 1.1 : 0.9;
draw(img);
};

canvas.onmousedown = (e)=>{
isDragging = true;
};

canvas.onmousemove = (e)=>{
if(isDragging){
offsetX += e.movementX;
offsetY += e.movementY;
draw(img);
}
};

canvas.onmouseup = ()=> isDragging=false;
};

function draw(img){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.save();
ctx.translate(offsetX, offsetY);
ctx.scale(scale, scale);

ctx.drawImage(img,0,0);

boxes.forEach(b=>{
ctx.strokeStyle="lime";
ctx.strokeRect(b.x,b.y,b.w,b.h);
});

ctx.restore();
}

function goHome(){
window.location.href = "dashboard.html";
}

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
