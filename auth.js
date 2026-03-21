function toggleTheme(){
  document.body.classList.toggle("light");
}

async function login(){
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;

  const { data } = await sb.from("ant_users").select("*").eq("email", email).single();

  if(!data){
    await sb.from("ant_users").insert([{email,name,status:"pending"}]);
    alert("Waiting for admin approval");
    return;
  }

  if(data.status !== "approved"){
    alert("Not approved yet");
    return;
  }

  localStorage.setItem("user", JSON.stringify(data));
  window.location.href = "dashboard.html";
}
