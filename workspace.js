const taskId = localStorage.getItem("taskId");

let canvas, ctx, img = new Image();
let boxes = [];
let scale = 1, offsetX = 0, offsetY = 0;

window.onload = async () => {

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  const { data } = await sb.from("ant_tasks")
    .select("*").eq("id", taskId).single();

  img.src = data.imgdata;

  img.onload = draw;

  canvas.onwheel = e=>{
    e.preventDefault();
    scale *= e.deltaY < 0 ? 1.1 : 0.9;
    draw();
  };

  canvas.onmousedown = ()=> dragging=true;
  canvas.onmousemove = e=>{
    if(dragging){
      offsetX += e.movementX;
      offsetY += e.movementY;
      draw();
    }
  };
  canvas.onmouseup = ()=> dragging=false;
};

function draw(){
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

function goBack(){
  location.href="dashboard.html";
}
