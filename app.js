// Ensure this is at the very top of app.js
const sb = window.supabase.createClient("https://qhftvfatzsogxbbqzxry.supabase.co", "YOUR_KEY");

async function handleLogin() {
    const email = document.getElementById("userEmail").value.trim().toLowerCase();
    const name = document.getElementById("userName").value.trim();
    
    if (!email || !name) return alert("Please fill in all fields");

    // 1. Check if user exists
    const { data: user, error } = await sb.from("ant_users").select("*").eq("email", email).single();

    if (!user) {
        // 2. Register New User
        await sb.from("ant_users").insert([{ email, name, status: 'pending', role: 'worker' }]);
        document.getElementById("waitMessage").style.display = "block";
        alert("Registration successful! You are now on the waitlist.");
    } else if (user.status === 'pending') {
        // 3. Already on Waitlist
        document.getElementById("waitMessage").style.display = "block";
        alert("Still waiting for Admin approval.");
    } else if (user.status === 'approved') {
        // 4. Success - Enter Dashboard
        localStorage.setItem('workerEmail', email);
        // Hide Login, Show Dashboard
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("topNav").style.display = "flex";
        document.getElementById("dashboard").style.display = "block";
        showDashboard(); // Call your dashboard loading function
    }
}
