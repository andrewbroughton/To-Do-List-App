// Define UI variabels
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

function loadEventListeners() {
    //add task event
    form.addEventListener('submit', addTask);
    // remove task events
    taskList.addEventListener('click', removeTask) 
    // clear task
    clearBtn.addEventListener('click', clearTasks)
    // filter tasks
    filter.addEventListener('keyup', filterTasks)
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

    //clear input
    taskInput.value = '';
 
    e.preventDefault();
}

// remove individual task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
        // test
        console.log(e.target);
    }
}

// clear all task
function clearTasks() {
    taskList.innerHTML = '';
    
    // test
    console.log('It Worked!');
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