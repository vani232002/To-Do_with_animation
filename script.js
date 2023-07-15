const inputTask = document.querySelector('#input');
const taskList = document.getElementById('list');
const count = document.getElementById('taskCount');

let toDoList = [];

document.addEventListener('click', handler);


function handler(e) {
  const target = e.target;
  if (target.classList.contains('add-task')) {
    subButton();
  }
  if (target.classList.contains('delete-task')) {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.classList.contains('check-task')) {
    const taskId = target.id;
    markDone(taskId);
    return;
  } else if (target.classList.contains('incomplete-tasks')) {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = false;
    }
    updateData();

  } else if (target.classList.contains('completed-tasks')) {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true;
    }
    updateData();
  } else if (target.classList.contains('double-check-task')) {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true;
    }
    updateData();

  } else if (target.classList.contains('delete-all-tasks')) {
    if (toDoList.length == 0) {
      return;
    } else {
      for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].done == true) {
          deleteTask(toDoList[i].id);
          return;
        }
      }
      updateData();
    }
  }
}

function subButton() {
  let value = inputTask.value;
  if (value === '') {
    alert('Enter the task');
    return;
  }
  const task = {
    name: value,
    id: Date.now().toString(),
    done: false
  };
  addTask(task);
  inputTask.value = '';
}

function addTask(task) {
  if (task) {
    toDoList.push(task);
    updateData();
    return;
  } else {
    alert('Task not added');
  }
}

function updateData() {
  taskList.innerHTML = '';
  if (toDoList.length == 0) {
    alert('All tasks are completed');
  }
  for (let i = 0; i < toDoList.length; i++) {
    renderList(toDoList[i]);
  }
  count.innerHTML = toDoList.length;
}

function renderList(task) {
  const li = document.createElement('li');

  li.setAttribute('class', 'task-item');
  li.setAttribute('data-key', task.id);

  if (task.done === true) {
    li.classList.add('checked');
  }

  li.innerHTML = `
    <input type="checkbox" class="check-task" id="${task.id}" ${task.done ? 'checked' : null}>
    <label for="${task.id}">${task.name}</label>
    <button class="delete-button">
      <i class="fa fa-trash-o delete-task" aria-hidden="true" data-id="${task.id}"></i>
    </button>`;
  taskList.append(li);
}

function deleteTask(id) {
  const newTasks = toDoList.filter(function (task) {
    return task.id !== id;
  });
  toDoList = newTasks;
  updateData();
}

function markDone(id) {
  const task = toDoList.filter(function (task) {
    return task.id === id;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    updateData();
    return;
  }
}
