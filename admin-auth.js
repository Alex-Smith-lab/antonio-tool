async function checkAuth() {
    const input = document.getElementById("adminEmailInput").value.toLowerCase().trim();
    const MASTER_ADMIN = "antonymbali96@gmail.com";

    console.log("Attempting admin login for:", input);

    // Check database for admin rights
    const { data: admins, error } = await _supabase.from("ant_admins").select("email").eq("email", input);

    if (input === MASTER_ADMIN || (admins && admins.length > 0)) {
        console.log("Admin verified.");
        // Hide the gate
        document.getElementById("auth-gate").style.display = "none";
        // Initialize the admin dashboard
        if (typeof loadData === "function") loadData();
    } else {
        alert("Access Denied: You do not have admin privileges.");
    }
}
