const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createTaskElement = function (taskString) {
  const taskListItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImage = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImage.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImage);

  taskListItem.appendChild(checkbox);
  taskListItem.appendChild(label);
  taskListItem.appendChild(editInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);

  return taskListItem;
};

const addTask = function () {
  if (!newTaskInput.value) {
    return;
  }

  const taskListItem = createTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(taskListItem);
  attachTaskEventHandlers(taskListItem, moveTaskToCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskListItem = this.parentNode;

  const editInput = taskListItem.querySelector('input[type=text]');
  const label = taskListItem.querySelector('label');
  const editButton = taskListItem.querySelector('.edit');
  const isInEditMode = taskListItem.classList.contains('editMode');

  if (isInEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskListItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskListItem = this.parentNode;
  const taskList = taskListItem.parentNode;

  taskList.removeChild(taskListItem);
};

const moveTask = function (taskListItem, targetList, checkboxChangeHandler) {
  targetList.appendChild(taskListItem);
  attachTaskEventHandlers(taskListItem, checkboxChangeHandler);
};

const moveTaskToCompleted = function () {
  moveTask(this.parentNode, completedTasksList, moveTaskToIncomplete);
};

const moveTaskToIncomplete = function () {
  moveTask(this.parentNode, incompleteTasksList, moveTaskToCompleted);
};

addTaskButton.addEventListener('click', addTask);

const attachTaskEventHandlers = function (taskListItem, checkboxChangeHandler) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxChangeHandler;
};

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  attachTaskEventHandlers(incompleteTasksList.children[i], moveTaskToCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  attachTaskEventHandlers(completedTasksList.children[i], moveTaskToIncomplete);
}
