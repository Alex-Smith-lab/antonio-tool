let currentTool = '2d';

function setTool(toolType) {
    currentTool = toolType;
    console.log("Switched tool to: " + toolType);
    // Logic to change cursor or drawing math based on toolType
}

async function loadDashboardTasks(userEmail) {
    const { data: tasks } = await sb.from("ant_tasks")
        .select("*")
        .or(`assignedto.eq.${userEmail},assignedto.eq.UNASSIGNED`)
        .eq("completed", false);
    
    renderTaskCards(tasks);
}
