$(document).ready(readyNow);

function readyNow(){
    clickListeners();
    getToDoList();
} // end readyNow

function clickListeners() {
    $('#add-btn').on('click', addNewTask);
    $('#todo-list').on('click', '#delete-btn', deleteTask); 
    $('#todo-list').on('click', '#complete-btn', taskStatus);
} // end clickListeners

// DELETE
function deleteTask() {
    let taskId = $(this).closest('tr').data('id');
    // swall alert for delete
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
            swal('Internal Server Error!');
        })
        }
        else {
            swal('Your task remains!');
        }
    });
} // end deleteTask

function addNewTask() {
    event.preventDefault();
    if ( $('#task-in').val() === '' ) {
        // swal alert for not all inputs completed
        swal({
            title: 'Hold up!',
            text: 'Nothing was entered!',
            icon: 'error'
        });
        return;
    } // end if
    let newTask = {
        item: $('#task-in').val(),
        status: 'false'
    };
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
        $('input').val('');
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
            let tr = '';
            if ( task.status === true ) {
                tr = $(`
                <tr class="bg-success text-white">
                    <td class="taskComplete align-middle">
                        <h4>${task.item}</h4>
                    </td>
                    <td><button type="button" class="btn btn-warning" id="complete-btn">Uncheck</button>
                    <button type="button" class="btn btn-danger" id="delete-btn">Delete</button></td>
                </tr>`);
            }
            else {
                tr = $(`
                <tr>
                    <td class="align-middle">
                        <h4>${task.item}</h4>
                    </td>
                    <td><button type="button" class="btn btn-outline-success" id="complete-btn">Complete</button>
                    <button type="button" class="btn btn-outline-danger" id="delete-btn">Delete</button></td>
                </tr>`);
            }
        $('#todo-list').append(tr);

        tr.data('id', task.id);
    }
} // end displayList

// PUT
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