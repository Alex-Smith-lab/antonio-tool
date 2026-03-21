// 🔥 INIT SUPABASE (ADD YOUR KEYS)
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 🔥 GET TASK ID
const taskId = localStorage.getItem("taskId");

let canvas, ctx;
let scale = 1, offsetX = 0, offsetY = 0;
let isDragging = false;
let boxes = [];
let img = null;

window.onload = async () => {
    canvas = document.getElementById("canvas");

    if (!canvas) {
        console.error("❌ Canvas not found");
        return;
    }

    ctx = canvas.getContext("2d");

    resize();
    window.addEventListener("resize", resize);

    if (!taskId) {
        alert("❌ No task selected");
        return;
    }

    // 🔥 FETCH TASK
    const { data, error } = await sb
        .from("ant_tasks")
        .select("*")
        .eq("id", taskId)
        .single();

    if (error || !data) {
        console.error("❌ Supabase error:", error);
        alert("Failed to load task");
        return;
    }

    if (!data.imgdata) {
        alert("❌ No image found in task");
        return;
    }

    // 🔥 LOAD IMAGE
    img = new Image();
    img.src = data.imgdata;

    img.onload = () => {
        draw();
    };

    img.onerror = () => {
        alert("❌ Failed to load image");
    };

    // 🔥 ZOOM
    canvas.onwheel = (e) => {
        e.preventDefault();

        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        scale *= zoomFactor;

        // LIMIT ZOOM
        scale = Math.min(Math.max(scale, 0.2), 10);

        draw();
    };

    // 🔥 PAN START
    canvas.onmousedown = () => {
        isDragging = true;
    };

    // 🔥 PAN MOVE
    canvas.onmousemove = (e) => {
        if (isDragging) {
            offsetX += e.movementX;
            offsetY += e.movementY;
            draw();
        }
    };

    // 🔥 PAN STOP
    canvas.onmouseup = () => isDragging = false;
    canvas.onmouseleave = () => isDragging = false;
};

// 🔥 DRAW FUNCTION
function draw() {
    if (!img) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    ctx.drawImage(img, 0, 0);

    // 🔥 DRAW BOXES
    boxes.forEach(b => {
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
    });

    ctx.restore();
}

// 🔥 NAVIGATION
function goHome() {
    window.location.href = "dashboard.html";
}

// 🔥 RESIZE
function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
