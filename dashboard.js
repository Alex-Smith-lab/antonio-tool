const user = JSON.parse(localStorage.getItem("user"));

window.onload = async () => {
document.getElementById("username").innerText = user.name;
document.getElementById("greet").innerText = `${getGreeting()}, ${user.name}`;
document.getElementById("season").innerText = "🚀 Ready to work";

loadTasks();
};

async function loadTasks() {
const { data } = await sb.from("ant_tasks")
.select("*")
.or(`assignedto.eq.${user.email},assignedto.eq.UNASSIGNED`);

document.getElementById("tasks").innerHTML = data.map(t => `
<div class="card">
<h3>${t.phase}</h3>

${
t.assignedto === "UNASSIGNED"
? `<button onclick="claim('${t.id}')">CLAIM</button>`
: `<button onclick="openTask('${t.id}')">START</button>`
}
</div>
`).join("");
}

async function claim(id) {
await sb.from("ant_tasks").update({
assignedto: user.email
}).eq("id", id);

loadTasks();
}

function openTask(id) {
localStorage.setItem("taskId", id);
window.location.href = "workspace.html";
}

function getGreeting(){
const h = new Date().getHours();
return h < 12 ? "☀️ Morning" : h < 17 ? "🌤 Afternoon" : "🌙 Evening";
}
