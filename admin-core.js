// This function moves a coworker from 'pending' (waitlist) to 'approved'
async function updateUserStatus(email, status) {
    const { error } = await _supabase
        .from("ant_users")
        .update({ status: status })
        .eq("email", email);

    if (!error) {
        alert(`User ${email} has been ${status}.`);
        loadData(); // Refresh UI
    }
}

async function loadData() {
    const { data: users } = await _supabase.from("ant_users").select("*");
    const { data: tasks } = await _supabase.from("ant_tasks").select("*");

    // Populate Coworker Table
    document.getElementById("userTable").innerHTML = users.map(u => `
        <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td><b style="color:${u.status === 'pending' ? '#ff9800' : '#00ff88'}">${u.status.toUpperCase()}</b></td>
            <td>
                ${u.status === 'pending' ? 
                    `<button class="btn green" onclick="updateUserStatus('${u.email}', 'approved')">Approve</button>` : 
                    `<button class="btn purple" onclick="updateUserStatus('${u.email}', 'pending')">Revoke</button>`
                }
            </td>
        </tr>
    `).join("");
    
    // logic for updating workerList dropdown for task assignment
    const approvedOnly = users.filter(u => u.status === 'approved');
    document.getElementById("workerList").innerHTML = `<option value="UNASSIGNED">-- POOL (Unassigned) --</option>` +
        approvedOnly.map(u => `<option value="${u.email}">${u.name}</option>`).join("");
}

// Function to handle tab switching
function showTab(id, btn) {
    document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
    document.getElementById(id).style.display = "block";
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}
