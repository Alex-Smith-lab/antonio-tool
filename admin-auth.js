const _supabase = window.supabase.createClient("YOUR_URL", "YOUR_KEY");
const MASTER_ADMIN = "antonymbali96@gmail.com";

async function checkAuth() {
    const input = document.getElementById("adminEmailInput").value.toLowerCase().trim();
    const { data: admins } = await _supabase.from("ant_admins").select("email").eq("email", input);
    
    if (input === MASTER_ADMIN || (admins && admins.length > 0)) {
        document.getElementById("auth-gate").style.display = "none";
        initRealtime();
        loadData();
    } else {
        alert("Verification Failed: Unauthorized Admin Email.");
    }
}
