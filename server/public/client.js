$(document).ready(readyNow);

function readyNow(){
    clickListeners();
    getToDoList();
} // end readyNow

function clickListeners() {
    $('#add-btn').on('click', addNewTask);
    $('#todo-list').on('click', '.delete-btn', deleteTask); 
    $('#todo-list').on('click', '.complete-btn', taskStatus);
} // end clickListeners

function taskToggleComplete() {
    $('#complete-btn')
}

function deleteTask() {
    let taskId = $(this).closest('tr').data('id');
    swal({
        title: 'Are you sure?',
        text: 'Once deleted, your task will be removed permanently!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            swal('Your task has been deleted!', {
            icon: 'success',
            });
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
        } // end if 
        else {
            swal('Your task remains!');
        } // end else
    });
} // end deleteTask

function addNewTask() {
    event.preventDefault();
    if ( $('#task-in').val() == '' ) {
        // alert('Not all inputs completed!');
        swal({
            title: 'Error!',
            text: 'Not all inputs completed!',
            icon: 'error'
        });
        return;
    }
    console.log('in addTask');
    // object if more properties need to be added for hw
    let newTask = {
        item: $('#task-in').val(),
        status: 'false'
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
        let taskComplete = 'className';
        if ( task.status === true ) {
            taskComplete = 'taskComplete';
        } // end if
        let tr = $(`
        <tr class="${taskComplete}">
            <td>${task.item}</td>
            <td><button class="complete-btn">Uncompleted</button></td>
            <td><button class="delete-btn btn-danger">Delete</button></td>
        </tr>`);
        $('#todo-list').append(tr);
        tr.data('id', task.id);
        console.log(task.id);
        tr.data('status', task.status);
        console.log('status', task.status);        
    } // end for of
} // end displayList

function clearInputs() {
    $('#task-in').val('');
} // end clearInputs

function taskStatus() {
    console.log('in taskComplete');
    let taskId = $(this).closest('tr').data('id');
    $.ajax({
        method: 'PUT',
        url: `list/status/${taskId}`
    })
    .then(function(response){
        getToDoList();
    })
    .catch(function(error){
        console.log('error on complete task', error);
    })
} // end taskStatus