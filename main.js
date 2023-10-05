const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('taskItem');

        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskText.classList.add('taskText');

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add('editButton');
        editButton.addEventListener('click', () => editTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', () => deleteTask(index));

        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(buttons);
        taskList.appendChild(taskItem);
    });
}


function addTask() {
    const newTask = taskInput.value.trim();

    if (newTask !== '') {
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    }
}


function editTask(index) {
    const editedTask = prompt('Edit task:', tasks[index]);
    
    if (editedTask !== null) {
        tasks[index] = editedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}


function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();
