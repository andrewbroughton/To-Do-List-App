// Define UI variabels
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    // remove task events
    taskList.addEventListener('click', removeTask) 
    // clear task
    clearBtn.addEventListener('click', clearTasks)
    // filter tasks
    filter.addEventListener('keyup', filterTasks)
}

// Get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    
    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //append to li
    taskList.appendChild(li);
    });
}

//add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //append to li
    taskList.appendChild(li);

    // Store to local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
 
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove individual task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        // test
        console.log(e.target);
    }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    // test
    console.log(taskItem);
}

// clear all task
function clearTasks() {
    taskList.innerHTML = '';

    // Clear from local storage
    clearTasksFromLocalStorage();
    
    // test
    console.log('It Worked!');
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    // querySelectorAll returns a node list
    document.querySelectorAll('.collection-item').forEach
        (function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) !== -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
    });
    // test
    console.log(e.target.value);
}