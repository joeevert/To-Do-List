console.log('js');

$(document).ready(readyNow);

function readyNow(){
    console.log('JQ');
    clickListeners();
}

function clickListeners() {
    $('#add-btn').on('click', addTask)
} // end clickListeners

// POST
function addTask() {
    event.preventDefault();
    console.log('in addTask');   
} // end addTask

// GET
function getList() {
    console.log('in getList');
    
    $.ajax({
        method: 'GET',
        url: '/list'
    })
    .then( function (response) {
        console.log(`response: ${response}`);
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
        let element = `
        <tr>
            <td>${task.name}</td>
            <td><button id="edit-btn">Edit</button></td>
            <td><button id="remove-btn">Remove</button></td>
        </tr>`
        $('#todo-list').append(element);
    } // end for of
} // end displayList