console.log('js');

$(document).ready(readyNow);

function readyNow(){
    console.log('JQ');
    clickListeners();
}

function clickListeners() {
    $('#add-btn').on('click', addTask)
} // end clickListeners

function addTask() {
    event.preventDefault();
    console.log('in addTask');   
} // end addTask

function getList() {
    console.log('in getList');
    
    $.ajax({
        method: 'GET',
        url: '/list'
    })
} // end getList

function displayList() {
    console.log('in displayList');
    

}