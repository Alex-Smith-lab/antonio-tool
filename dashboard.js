let user = JSON.parse(localStorage.getItem("user"));

window.onload = async ()=>{
  if(!user) location.href="index.html";

  document.getElementById("username").innerText = user.name;
  document.getElementById("greeting").innerText = "👋 Welcome " + user.name;

  const { data: tasks } = await sb
    .from("ant_tasks")
    .select("*")
    .or(`assignedto.eq.${user.email},assignedto.eq.UNASSIGNED`);

  document.getElementById("tasks").innerHTML =
    tasks.map(t => `
      <div class="card">
        Task ${t.id}
        <button onclick="openTask('${t.id}')">Start</button>
      </div>
    `).join("");
};

function openTask(id){
  localStorage.setItem("taskId", id);
  location.href = "workspace.html";
}

function logout(){
  localStorage.clear();
  location.href = "index.html";
}
