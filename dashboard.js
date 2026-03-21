async function showDashboard(){

loginPage.style.display = "none";
dashboard.style.display = "block";
topNav.style.display = "flex";

greet.innerText = `${user.name}, ${getGreetingPrefix()}`;

workerProfile.innerHTML = `
<b>${user.name}</b><br>
<span>${user.email}</span>
`;

const { data: tasks } = await sb
.from("ant_tasks")
.select("*")
.or(`assignedto.eq.${user.email},assignedto.eq.UNASSIGNED`)
.eq("completed", false);

tasksContainer(tasks);
}

function tasksContainer(tasks){
tasks.innerHTML = (tasks || []).map(t => {

const isPool = t.assignedto === 'UNASSIGNED';

return `
<div class="batch-card">
<p>Phase: ${t.phase}</p>

${
isPool
? `<button onclick="claimTask('${t.id}')">CLAIM</button>`
: `<button onclick="openWork('${t.id}')">START</button>`
}
</div>
`;

}).join("");
}

async function claimTask(id){
await sb.from("ant_tasks")
.update({ assignedto: user.email })
.eq("id", id);

showDashboard();
}
