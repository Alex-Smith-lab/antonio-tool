async function loadData() {
    const { data: users } = await _supabase.from("ant_users").select("*");
    const { data: tasks } = await _supabase.from("ant_tasks").select("*");

    document.getElementById("userTable").innerHTML = users.map(u => `
        <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td style="color:${u.status === 'pending' ? 'orange' : 'lime'}">${u.status}</td>
            <td><button class="btn green" onclick="approveUser('${u.email}')">Approve</button></td>
        </tr>`).join("");

    document.getElementById("workerList").innerHTML = users.filter(u => u.status === 'approved')
        .map(u => `<option value="${u.email}">${u.name}</option>`).join("");
}

async function approveUser(email) {
    await _supabase.from("ant_users").update({ status: 'approved' }).eq("email", email);
    loadData();
}

async function sendTask() {
    const file = document.getElementById("taskFile").files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
        await _supabase.from("ant_tasks").insert([{
            id: Date.now(),
            imgdata: e.target.result,
            assignedto: document.getElementById("workerList").value,
            tool: document.getElementById("toolType").value
        }]);
        alert("Sent!");
    };
    reader.readAsDataURL(file);
}

function showTab(id, btn) {
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}
