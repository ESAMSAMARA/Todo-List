let input = document.querySelector("#input"),
submit = document.querySelector("#add"),
tasks_div = document.querySelector(".tasks"),
delete_all_tasks = document.querySelector("#delete")

if(localStorage.getItem("tasks")){
    array_of_tasks = JSON.parse(localStorage.getItem('tasks'))
}else {
    array_of_tasks = []
}

delete_all_tasks.onclick = function(){
    delete_all()
}

getData()

// Add Tasks 
submit.onclick = function(){
    if(input.value !== ""){
        // Add Task To Array 
        addTask(input.value)
        input.value = ""
    }
}

tasks_div.addEventListener("click",function(e){
    if(e.target.classList.contains("del")){
        // Remove Tasks From LocalStorage 
        remove_local_storage(e.target.parentElement.getAttribute('data-id'))
       // remove Element From Page 
        e.target.parentElement.remove()
    }

    // Update Task 
    if(e.target.classList.contains("task")){
        toggleStatusTask(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})

function addTask(task_text){
    // Task Data
    const task = {
        id:Date.now(),
        task_name:task_text,
        completed:false
    };

    array_of_tasks.push(task)
    // Add Tasks To Page
    createElements(array_of_tasks)
    // Add Tasks To localStorage
    save_local_storage(array_of_tasks)
}

// Create Element To Page  
function createElements(array){
    tasks_div.innerHTML = ""
    array.forEach(task_content => {        
        let task = document.createElement("task")   
        task.className = "task"
        if(task_content.completed){
            task.className = "task done"
        }

        task.setAttribute("data-id",task_content.id)
        task.appendChild(document.createTextNode(task_content.task_name))
        tasks_div.appendChild(task)
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Delete")) 
        task.appendChild(span)
    });
}

// Add Tasks To localStorage
function save_local_storage(array){
    window.localStorage.setItem("tasks",JSON.stringify(array))
}

function getData(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data)
        createElements(tasks)
    }
}

function remove_local_storage(task_id){
    array_of_tasks = array_of_tasks.filter((task) => task.id != task_id)
    save_local_storage(array_of_tasks)
}

function toggleStatusTask(task_id){
    for (let i = 0; i < array_of_tasks.length; i++) {
        if(array_of_tasks[i].id == task_id){
            // console.log(array_of_tasks[i].completed)
            array_of_tasks[i].completed == false ? array_of_tasks[i].completed = true : array_of_tasks[i].completed = false 
        }
    }
    save_local_storage(array_of_tasks)
}

function delete_all(){
    tasks_div.innerHTML = ""
    localStorage.clear()
}