const input = document.getElementById("input");
const btn = document.getElementById("btn");
const parent = document.getElementById("parent");

//-------------------------------------------------Dispplaying data from localStorage to DOM and adding to array----------------------------------------------------
var array = localStorage.getItem("todos");
if (array)
{
  array = JSON.parse(array);
}
if (array)
{
  array.forEach(function (todo)
  {
    toDoTask(todo);
  });
}
else
{
  array = [];
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------





//------------------------------------------------------- Button listener to add task---------------------------------------------------------------------------------
btn.addEventListener("click", function () {
  var task = [];
  task.push(input.value);
  if (!task[0])
  {
    btn.classList.add("warning");
    return;
  }
  if (task.length === 1)
  {
    task.push(false);
  }
  btn.classList.remove("warning");

  toDoTask(task);

  input.value = "";
  array.push(task);
  localStorage.setItem("todos", JSON.stringify(array));
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------




//------------------------------------------------------------------toDoTask function Definition------------------------------------------------------------------------
function toDoTask(task)
{
  var listItem = document.createElement("div");
  var para = document.createElement("p");
  para.innerText = task[0];
 
  updateadd(para,task,listItem);

  listItem.appendChild(para);

  parent.appendChild(listItem);
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------





//-------------------------------------------------------------------Delete function Definition-----------------------------------------------------------------------------
function todoDelete(listItem, toDel)
{
  parent.removeChild(listItem);
  var index = array.indexOf(toDel);
  array.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(array));
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------taskStatus function Definition-------------------------------------------------------------------
function taskStatus(listItem, task)
{
  if (task[1]) {
    task[1] = false;
    listItem.classList.remove("completed");
  } else {
    task[1] = true;
    listItem.classList.add("completed");
  }
 localStorage.setItem("todos", JSON.stringify(array));
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------Update function Definition----------------------------------------------------------------------------
function update(listItem, toUpdate, para)
{
  var edit = document.createElement("input");
  edit.value = toUpdate[0];
  listItem.appendChild(edit);
  var done = document.createElement("button");
  done.innerText = "Done";
  listItem.appendChild(done);
  var cancel = document.createElement("button");
  cancel.innerText = "cancel";
  listItem.appendChild(cancel);

  done.addEventListener("click", function () {
      var index = array.indexOf(toUpdate);
      var curr = [];
      curr.push(edit.value);
      curr.push(false);
      para.innerText = curr[0];
      listItem.classList.remove("completed");
      
      updateadd(para,curr,listItem);
        
      array.splice(index, 1,curr);
      localStorage.setItem("todos", JSON.stringify(array));
      listItem.removeChild(edit);
      listItem.removeChild(done);
      listItem.removeChild(cancel);
      return; 
  });

 cancel.addEventListener("click", function () {
      listItem.removeChild(edit);
      listItem.removeChild(done);
      listItem.removeChild(cancel);
      return;
  });


}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------






//----------------------------------------------------------------------------UpdateAdd Definition--------------------------------------------------------------------------
function updateadd(para, task, listItem)
{
  //----------------------------Task Status Button------->>>>>>>>>>>>>>
  var check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.checked = task[1];
  if (task[1]) {
    listItem.classList.add("completed");
  } else {
    listItem.classList.remove("completed");
  }
  check.addEventListener("change", function () {
    taskStatus(listItem,task);
  });
  para.appendChild(check);


//----------------------------Delete Button----------->>>>>>>>>>>>>>>>>>
  // var deleteBtn = document.createElement("button");
  // deleteBtn.innerText = "Delete Task";
  var deleteBtn = document.createElement("img");
  deleteBtn.setAttribute("src", "delete.png");
  deleteBtn.setAttribute("alt", "delete");
  deleteBtn.setAttribute("width", "15");
  deleteBtn.setAttribute("height", "15");
  deleteBtn.addEventListener("click", function () {
    todoDelete(listItem, task);
  });
  para.appendChild(deleteBtn);


//------------------------------Update Button ---------->>>>>>>>>>>>>>>
  // var updateBtn = document.createElement("button");
  // updateBtn.innerText = "Update Task";
  var updateBtn = document.createElement("img");
  updateBtn.setAttribute("src", "edit.png");
  updateBtn.setAttribute("alt", "update");
  updateBtn.setAttribute("width", "15");
  updateBtn.setAttribute("height", "15");
  updateBtn.addEventListener("click", function () {
    update(listItem,task,para);
  });
  para.appendChild(updateBtn);


  //-----------------------------Add line below each task------>>>>>>>>>
  var line = document.createElement("hr");
  para.appendChild(line);


}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------