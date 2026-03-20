const _supabase = window.supabase.createClient("https://qhftvfatzsogxbbqzxry.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZnR2ZmF0enNvZ3hiYnF6eHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3Nzk5MjEsImV4cCI6MjA4ODM1NTkyMX0.A9jvgex5vX1uuGCrzK78yjPGGDBnXLVjK4lOGP0vk0w");

async function checkAuth() {
    const email = document.getElementById("adminEmailInput").value.trim().toLowerCase();
    const { data } = await _supabase.from("ant_admins").select("email").eq("email", email);

    if (email === "antonymbali96@gmail.com" || (data && data.length > 0)) {
        document.getElementById("auth-gate").style.display = "none";
        document.getElementById("admin-content").style.display = "flex";
        loadData(); // Defined in admin-core.js
    } else {
        alert("Unauthorized Admin");
    }
}
