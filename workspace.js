let activeId = null;
let boxes = [];
let canvas, ctx, img = new Image();

async function openWork(id){
activeId = id;

dashboard.style.display = "none";
workspacePage.style.display = "block";

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

const { data } = await sb
.from("ant_tasks")
.select("*")
.eq("id", id)
.single();

boxes = data.annotations || [];

img.src = data.imgdata;

img.onload = () => draw();
}

function draw(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(img,0,0);

boxes.forEach(b=>{
ctx.strokeStyle = "lime";
ctx.strokeRect(b.x,b.y,b.w,b.h);
});
}

async function saveProgress(){
await sb.from("ant_tasks")
.update({ annotations: boxes })
.eq("id", activeId);
}

async function submitForReview(){
await sb.from("ant_tasks")
.update({
completed: true,
phase: "1st Pass"
})
.eq("id", activeId);

alert("Submitted!");
location.reload();
}

function deleteBox(){
boxes.pop();
draw();
saveProgress();
}
