//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

//New task list item
const createTaskElement = function (taskString) {
  const taskListItem = document.createElement('li');

  //input (checkbox)
  const checkbox = document.createElement('input');
  //label
  const label = document.createElement('label');
  //input (text)
  const editInput = document.createElement('input');
  //button.edit
  const editButton = document.createElement('button');

  //button.delete
  const deleteButton = document.createElement('button');
  const deleteButtonImage = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImage.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImage);

  //and appending.
  taskListItem.appendChild(checkbox);
  taskListItem.appendChild(label);
  taskListItem.appendChild(editInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);
  return taskListItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) {
    return;
  }
  const taskListItem = createTaskElement(newTaskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTasksList.appendChild(taskListItem);
  attachTaskEventHandlers(taskListItem, moveTaskToCompleted);

  newTaskInput.value = '';
};

//Edit an existing task.
const editTask = function () {
  const taskListItem = this.parentNode;

  const editInput = taskListItem.querySelector('input[type=text]');
  const label = taskListItem.querySelector('label');
  const editButton = taskListItem.querySelector('.edit');
  const isInEditMode = taskListItem.classList.contains('editMode');

  //If class of the parent is .editmode
  if (isInEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskListItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskListItem = this.parentNode;
  const taskList = taskListItem.parentNode;

  //Remove the parent list item from the ul.
  taskList.removeChild(taskListItem);
};

const moveTask = function (taskListItem, targetList, checkboxChangeHandler) {
  targetList.appendChild(taskListItem);
  attachTaskEventHandlers(taskListItem, checkboxChangeHandler);
};

//Mark task completed
const moveTaskToCompleted = function () {
  moveTask(this.parentNode, completedTasksList, moveTaskToIncomplete);
};

const moveTaskToIncomplete = function () {
  moveTask(this.parentNode, incompleteTasksList, moveTaskToCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener('click', addTask);

const attachTaskEventHandlers = function (taskListItem, checkboxChangeHandler) {
  //select ListItems children
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkbox.onchange = checkboxChangeHandler;
};

//cycle over incompleteTasksList ul list items
//for each list item
for (let i = 0; i < incompleteTasksList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  attachTaskEventHandlers(incompleteTasksList.children[i], moveTaskToCompleted);
}

//cycle over completedTasksList ul list items
for (let i = 0; i < completedTasksList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  attachTaskEventHandlers(completedTasksList.children[i], moveTaskToIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
