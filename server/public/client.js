$(document).ready(readyNow);

function readyNow(){
    clickListeners();
    getToDoList();
} // end readyNow

function clickListeners() {
    $('#add-btn').on('click', addNewTask)
} // end clickListeners

function addNewTask() {
    event.preventDefault();
    console.log('in addTask');
    // object incase more properties added
    let newTask = {
        item: $('#task-in').val()
    };
    console.log(newTask);
    postTask(newTask);
} // end addTask

// POST
function postTask(newTask) {
    console.log('in postTask');
    $.ajax({
        method: 'POST',
        url: '/list',
        data: newTask
    })
    .then( function (response) {
        console.log(response);
        getToDoList();
        clearInputs();
    })
    .catch( function (error) {
        console.log(error);
    })
} // end postTask

// GET
function getToDoList() {
    console.log('in getList');
    $.ajax({
        method: 'GET',
        url: '/list'
    })
    .then( function (response) {
        console.log(response);
        displayList(response);
    })
    .catch( function (error) {
        console.log(`error getting list: ${error}`);   
    })
} // end getList

function displayList(list) {
    console.log('in displayList');
    $('#todo-list').empty();
    for( let task of list) {
        let tr = $(`
        <tr>
            <td>${task.item}</td>
            <td><button id="complete-btn">Complete</button></td>
            <td><button id="delete-btn">Delete</button></td>
        </tr>`);
        $('#todo-list').append(tr);
    } // end for of
} // end displayList

function clearInputs() {
    $('#task-in').val('')
} // end clearInputs