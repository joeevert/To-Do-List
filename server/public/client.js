$(document).ready(readyNow);

function readyNow(){
    clickListeners();
    getToDoList();
} // end readyNow

function clickListeners() {
    $('#add-btn').on('click', addNewTask);

    $('#todo-list').on('click', '.delete-btn', function() {
        let taskId = $(this).closest('tr').data('id');
        console.log(taskId);
        deleteTask(taskId);
    });    
} // end clickListeners

function deleteTask(taskId) {
    console.log('in deleteTask');
    $.ajax({
        method: 'DELETE',
        url: `/list/${taskId}`
    })
    .then( function (response) {
        console.log(response);
        getToDoList();  
    })
    .catch( function (error) {
        console.log(error);        
    })
} // end deleteTask

function addNewTask() {
    event.preventDefault();
    console.log('in addTask');
    // object if more properties need to be added for hw
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
            <td><button class="delete-btn btn-danger">Delete</button></td>
        </tr>`);
        $('#todo-list').append(tr);
        tr.data('id', task.id);
        console.log(task.id);
        
    } // end for of
} // end displayList

function clearInputs() {
    $('#task-in').val('')
} // end clearInputs