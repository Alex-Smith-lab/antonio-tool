const sb = window.supabase.createClient("https://qhftvfatzsogxbbqzxry.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZnR2ZmF0enNvZ3hiYnF6eHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3Nzk5MjEsImV4cCI6MjA4ODM1NTkyMX0.A9jvgex5vX1uuGCrzK78yjPGGDBnXLVjK4lOGP0vk0w");

async function handleLogin() {
    const email = document.getElementById("userEmail").value.toLowerCase().trim();
    const name = document.getElementById("userName").value.trim();

    const { data: user } = await sb.from("ant_users").select("*").eq("email", email).single();

    if (!user) {
        await sb.from("ant_users").insert([{ email, name, status: 'pending' }]);
        document.getElementById("waitMessage").style.display = "block";
    } else if (user.status === 'pending') {
        document.getElementById("waitMessage").style.display = "block";
    } else {
        localStorage.setItem("workerEmail", email);
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        loadWorkerTasks(email);
    }
}
