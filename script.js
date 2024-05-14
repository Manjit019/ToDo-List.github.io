const userInput = document.querySelector(".userInput");
const addBtn = document.querySelector(".btn");
const todoLists = document.querySelector(".todo");
const totalTasks = document.querySelector("#total-tasks");
const completedTasks = document.querySelector("#task-completed");



var tasks = [];
var localdata = localStorage.getItem("my-todoes");
if (localdata != null) {
    tasks = JSON.parse(localdata);
    renderTasks("all");
}

addBtn.addEventListener("click", () => {
    if (userInput.value == "") {
        alert("You must have to write something.");
    }
    else {
        const task = userInput.value.trim();
        userInput.value = "";
        const tasksObj = {
            taskId: tasks.length + 1,
            name: task,
            status: "incomplete"
        };
        tasks.push(tasksObj);
        renderTasks("all");
        progress();
        saveTask();
    }
})


function renderTasks(filter) {

    todoLists.innerHTML = "";
    if (tasks.length == 0) {
        totalTasks.textContent = "0";
        todoLists.innerHTML = `<div class="message">NO tasks! </div>`;
    }
    else {
        tasks.forEach(task => {
            if (task.status == filter || filter == "all") {
                let li = document.createElement("li");
                li.className = task.status;

                li.innerHTML = `<i class="fa-solid"></i><span>O</span> ${task.name}  
<input type="button" value="X" class="btn-danger close">
`           ;
                todoLists.appendChild(li);


                li.addEventListener("click", (e) => {

                    if (e.target.className === "completed") {
                        e.target.className = "incomplete";
                        task.status = "incomplete";

                    }
                    else {
                        e.target.className = "completed";
                        task.status = "completed";
                    }

                    if (e.target.tagName === "INPUT") {

                        let index = tasks.findIndex(m => m.taskId == event.target.taskId);
                        tasks.splice(index, 1);
                        totalTasks.textContent = tasks.length;
                        e.target.parentElement.remove();
                        progress();
                        saveTask();
                    }
                    completedTasks.textContent = document.querySelectorAll("li.completed").length;
                    progress();
                    saveTask();

                });
              
            }

        });

        totalTasks.textContent = tasks.length;
        completedTasks.textContent = document.querySelectorAll("li.completed").length;
        progress();
        saveTask();

    }

}
renderTasks("all");

function progress() {

    if (totalTasks.textContent == 0) {
        document.querySelector(".progress").style.width = 0;
        document.querySelector("#percent").textContent = "0%";
    }
    else {
        let percent;
        percent = (completedTasks.textContent / totalTasks.textContent) * 100;
        percent = Math.round(percent) + "%";
        document.querySelector(".progress").style.width = percent;
        document.querySelector("#percent").textContent = percent;
    }
}
function clearAll() {
    tasks.splice(0);
    renderTasks();
    completedTasks.textContent = "0";
    progress();
}
function allTodoes() {
    renderTasks("all");
    document.getElementById('txt').textContent = "tasks completed";
    if(document.querySelectorAll(".todo li").length==0){
        todoLists.innerHTML=`<div class="message">NO Tasks! Yet </div>`;
    }
}
function pendingTodoes() {
    renderTasks("incomplete");

    completedTasks.textContent = document.querySelectorAll("li.complete").length;
    totalTasks.textContent = document.querySelectorAll("li.incomplete").length;
    progress();
    document.getElementById('txt').textContent = "completed pending tasks";
    if(document.querySelectorAll("li.incomplete").length==0){
        todoLists.innerHTML=`<div class="message">NO Pending Tasks!</div>`;
    }
}
function completedTodoes() {
    renderTasks("completed");

    document.getElementById('txt').textContent = "tasks completed";
    if(document.querySelectorAll("li.completed").length==0){
        todoLists.innerHTML=`<div class="message">NO Completed Tasks!Yet </div>`;
    }
}
function saveTask() {
    const myTasks = JSON.stringify(tasks);
    localStorage.setItem("my-todoes", myTasks);
}



//Active menu bar
let menu = document.querySelectorAll(".task-menu li");

for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click", function () {
        let current = document.querySelector(".active");
        current.className = current.className.replace("active", "");
        this.className += "active";
    })
}

