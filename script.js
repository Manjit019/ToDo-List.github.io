const userInput = document.querySelector(".userInput");
const addBtn = document.querySelector(".btn");
const todoLists = document.querySelector(".todo");
const totalTasks = document.querySelector("#total-tasks");
const completedTasks = document.querySelector("#task-completed");



addBtn.addEventListener("click", () => {
    if (userInput.value == "") {
        alert("You must have to write something.");
    }
    else {
        const todoes = document.createElement("li");
        const task = userInput.value.trim();
        todoes.innerHTML = `<i class="fa-solid"></i><span>O</span> ${task}  
    <input type="button" value="X" class="btn-danger close">
  `
        todoLists.appendChild(todoes);
        saveTask();
        document.querySelector(".message").style.display = "none";
        userInput.value = "";
    }
    totalTasks.textContent = document.getElementsByTagName("li").length - 3;
})



todoLists.addEventListener('click', (e) => {
    console.log(e);

    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
        e.target.childNodes[0].classList.toggle("fa-circle-check");
        totalTasks.textContent = document.getElementsByTagName("li").length - 3;
        completedTasks.textContent = document.querySelectorAll(".todo li.completed").length;
        saveTask();
        progress();
        
    }

    if (e.target.tagName === "INPUT") {
        e.target.parentElement.remove();
        totalTasks.textContent = (document.getElementsByTagName("li").length - 3);
        completedTasks.textContent = document.querySelectorAll(".todo li.completed").length;
        saveTask();
        progress();
       
    }
   
    if (document.getElementsByTagName("li").length == 3) {
        document.querySelector(".message").style.display = "block";
    }

});

function progress() {

    if (totalTasks.textContent == 0) {
        document.querySelector(".progress").style.width = 0;
        document.querySelector("#percent").textContent = "0%";
    }
    else {
        let percent;
        percent = (completedTasks.textContent / totalTasks.textContent) * 100 ;
        percent=Math.round(percent)+ "%";
        document.querySelector(".progress").style.width = percent;
        document.querySelector("#percent").textContent = percent;
    }
}
// function clearAll(){
//   todoLists.remove();
// }
// function pendingTodoes{

// }

function saveTask(){
    localStorage.setItem("todoLists",todoLists.innerHTML)
}
function showtasks(){
   todoLists.innerHTML=localStorage.getItem("todoLists");
   totalTasks.textContent = (document.getElementsByTagName("li").length - 3);
   completedTasks.textContent = document.querySelectorAll(".todo li.completed").length;
   progress();
}

showtasks();
