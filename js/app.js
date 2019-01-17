// problem: User interaction doesn't provide desired results.
// add interactivity so user can manage daily tasks.

// element references
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName('button')[0];
var incompleteTasksHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks'); 
var isEmpty = true;

var isFieldEmpty = function()
{
  
  if(taskInput.value.length > 1)
  {
   
    isEmpty = false;
  }
  else
  {
    isEmpty = true;
  }
  
  return isEmpty;
}

//new task list item
var createNewTaskElement = function(taskString)
{
  //create list item
  var listItem = document.createElement("li");  
  // input (checkbox)
  var checkBox = document.createElement("input") //checkbox;
  var liNumber = incompleteTasksHolder.getElementsByTagName('li').length;
  liNumber = parseInt(liNumber) + 1;
  var idName = 'checkbox' + liNumber;
  checkBox.id = idName;

  var checkBoxLabel = document.createElement("label");
  checkBoxLabel.classList.add('checkboxLabel');
  checkBoxLabel.htmlFor = idName;
  // label
  var label = document.createElement("label");
  label.classList.add('todoLabel');
  // input(text)
  var editInput =  document.createElement("input") //text;
  //button.edit
  var editBtn = document.createElement("button");
  //button.delete
  var deleteBtn = document.createElement("button");
  
  //modified elements
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  label.innerText = taskString;
  editBtn.innerText = "Edit";
  deleteBtn.innerText = "Delete";
  
  editBtn.className = "edit";
  deleteBtn.className = "delete";
  
  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(checkBoxLabel);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);
  
  return listItem;

}


// Add new task
var addTask = function()
{
  //Create a new list item with val from new task
  if(isEmpty === false)
  {
    var listItem =  createNewTaskElement(taskInput.value);
    $(listItem).fadeOut(1).slideDown(1000);
    incompleteTasksHolder.appendChild(listItem);

   bindTaskEvents(listItem,taskCompleted);
    taskInput.value = "";
  }
  else
  {
    alert('field empty');
  }
  
}



//Edit existing task
var editTask = function()
{
  var listItem = this.parentNode;
  var input = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('.todoLabel');
  var containsClass = listItem.classList.contains("editMode");
  
  if(containsClass)
  {
    label.innerText = input.value;
    listItem.querySelector('button.edit').innerText = "Edit";
    $('.editMode').removeClass('animated rubberBand');
     $(this).closest('li').addClass('animated bounceInLeft');
}
  else
  {
    input.value = label.innerText;
    listItem.querySelector('button.edit').innerText = "Save";
    $('.editMode').closest('li').removeClass('animated bounceInLeft');

  }
  
  // toggle edit mode on list item;
  
  listItem.classList.toggle("editMode");
  $('.editMode').addClass('animated rubberBand');


}

// Delete and existing task
var deleteTask = function()
{
    console.log('deleteTask');
    
    var listItem = this.parentNode;

    var ul = listItem.parentNode;

    $(listItem).closest('li').slideUp(400, function(){
      ul.removeChild(listItem);
    });
   

    // When delete button is pressed we want to remove parent list item from ul
}

var taskCompleted = function()
{
  console.log('taskComplete');
  // append the task list item to the completed tasks
  var listItem =  this.parentNode;
   $(listItem).fadeOut(500,function(){
    $(this).closest('li').removeClass('animated bounceInLeft');
    completedTasksHolder.appendChild(listItem);
  }).slideDown(500);
  
  bindTaskEvents(listItem,taskIncomplete);
}

var taskIncomplete = function()
{
  console.log('taskINComplete');
   var listItem =  this.parentNode;
    $(listItem).fadeOut(500, function(){
      $(this).closest('li').removeClass('animated bounceInLeft');
      incompleteTasksHolder.appendChild(listItem);
    }).slideDown(500);
  
   bindTaskEvents(listItem,taskCompleted);
}

var AJAXRequest = function(){
    console.log('AJAX request');
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler)
{
   
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector('button.edit');
    var deleteButton = taskListItem.querySelector('button.delete');
  
    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);
  //globalclick event handler  
  checkBox.onchange = checkBoxEventHandler;
  
}


// set click handler on add button
addButton.addEventListener('click', addTask);
addButton.addEventListener('click',AJAXRequest);
taskInput.addEventListener('keyup',isFieldEmpty);
    
    //cycle over incomplete task holder ul li items
    
    for(var i = 0; i < incompleteTasksHolder.children.length; i++ )
    {
        bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
    }
    
    for(var i = 0; i < completedTasksHolder.children.length; i++ )
    {
        bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
    }
   

    






