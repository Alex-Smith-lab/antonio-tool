async function login() {
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;

if(!name || !email) return alert("Fill all");

const { data: existing } = await sb.from("ant_users")
.select("*").eq("email", email).single();

if (!existing) {
await sb.from("ant_users").insert([{
name, email, role:"worker", status:"pending"
}]);
document.getElementById("wait").innerText = "Waiting admin approval...";
return;
}

if (existing.status !== "approved") {
document.getElementById("wait").innerText = "Pending approval...";
return;
}

localStorage.setItem("user", JSON.stringify(existing));
window.location.href = "dashboard.html";
}
