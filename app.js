const sb = window.supabase.createClient("YOUR_URL", "YOUR_KEY");

async function handleLogin() {
    const email = document.getElementById("userEmail").value.trim().toLowerCase();
    const name = document.getElementById("userName").value.trim();
    
    const { data: user, error } = await sb.from("ant_users").select("*").eq("email", email).single();

    if (!user) {
        // New user: Insert as pending
        await sb.from("ant_users").insert([{ email, name, status: 'pending' }]);
        document.getElementById("waitMessage").style.display = "block";
    } else if (user.status === 'pending') {
        // Still pending: Show waitlist message
        document.getElementById("waitMessage").style.display = "block";
    } else if (user.status === 'approved') {
        // Approved: Proceed to dashboard
        localStorage.setItem('workerEmail', email);
        location.reload(); 
    }
}
