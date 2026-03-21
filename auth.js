let user = null;

window.onload = async () => {
const savedEmail = localStorage.getItem('workerEmail');

if(savedEmail){
const { data } = await sb.from("ant_users")
.select("*")
.eq("email", savedEmail)
.single();

if(data && data.status === 'approved'){
user = data;
showDashboard();
}
}
};

async function handleLogin(){
const email = userEmail.value.trim().toLowerCase();
const name = userName.value.trim();

if(!email || !name) return alert("Enter details");

const { data: existing } = await sb
.from("ant_users")
.select("*")
.eq("email", email)
.single();

if(!existing){
await sb.from("ant_users").insert([{
email, name, role: 'worker', status: 'pending', balance: 0
}]);

waitMessage.style.display = "block";
}
else if(existing.status === 'pending'){
waitMessage.style.display = "block";
}
else{
user = existing;
localStorage.setItem("workerEmail", email);
showDashboard();
}
}

function logout(){
localStorage.clear();
location.reload();
}
