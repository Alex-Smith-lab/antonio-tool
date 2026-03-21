<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Dashboard</title>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabase.js"></script>
<script src="js/dashboard.js"></script>

<link rel="stylesheet" href="css/styles.css">
</head>

<body>

<!-- HEADER -->
<div class="topbar">
<div class="logo">AVALA AI</div>

<div class="profile" onclick="toggleProfile()">
👤 Profile
</div>
</div>

<!-- TASKBAR -->
<div class="taskbar">
<div>👩‍💻 Coworker: <span id="username"></span></div>
<div>Company: Avala AI</div>
</div>

<!-- GREETING -->
<div class="greeting">
<img class="avatar" src="assets/avatars/default.png">
<h2 id="greet"></h2>
<p id="season"></p>
</div>

<!-- TASKS -->
<div id="tasks" class="task-grid"></div>

</body>
</html>
