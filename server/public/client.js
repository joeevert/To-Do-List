console.log('js');

$(document).ready(readyNow);

function readyNow(){
    console.log('JQ');
    clickListeners();
    getToDoList();
} // end readyNow

function clickListeners() {
    $('#add-btn').on('click', addTask)
} // end clickListeners

// POST
function addTask() {
    event.preventDefault();
    console.log('in addTask');   
} // end addTask

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