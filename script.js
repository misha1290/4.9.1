document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add("completed");
            }

            li.addEventListener("click", () => {
                task.completed = !task.completed;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Видалити";
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    };

    addTaskButton.addEventListener("click", () => {
        if (taskInput.value.trim() === "") return;

        tasks.push({ text: taskInput.value, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks();
    });

    renderTasks();
});
