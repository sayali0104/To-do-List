
const expand_btn = document.querySelector(".expand-btn");



expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});




const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;
let taskList=[];


const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText === "") {
        alert("Please Enter Something");
        return false;
    }

    if (addBtn.value === "Edit") {
       
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {
        // const checkbox = document.createElement("input");
        // checkbox.type = "checkbox";
        // checkbox.classList.add("btn","checkbox");
        // li.appendChild(checkbox);
                // 
                // checkbox.addEventListener("change", function() {
                // p.style.textDecoration = checkbox.checked ? "line-through" : "none";
                // });
                
       if(taskList.includes(inputText)){
        alert("error");
       }
                const li = document.createElement("li");
                li.classList.add("txt-li");
                const p = document.createElement("p");
                p.innerHTML = inputText;
                li.appendChild(p);
                const hr=document.createElement("hr");
                todoList.insertBefore(hr,li.nextSibling);
                

        let existTask=todoList.getElementsByTagName("li");
        for(let i=0;i<existTask.length;i++){
          if(existTask[i].textContent===inputText){
            alert("error");
            return;
          }
        }

      

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

       
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}
function clearAll(){
    const todoList=document.getElementById('todoList')
    const clear=confirm("Are you sure you want to clear all Tasks?");
    if(clear){
    while (todoList.firstChild){
        todoList.removeChild(todoList.firstChild);
    
    }
    // localStorage.removeItem('todos');
    // console.log(localStorage.getItem());
}

}

const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;

    }
}


const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {

            
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);


            
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}


const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    console.log(todoIndex);
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
localStorage.clear();