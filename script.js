const userInput = document.querySelector(".userInput");
const addBtn = document.querySelector(".btn");
const todoLists = document.querySelector(".todo");
const totalTasks=document.querySelector("#total-tasks");
const completedTasks=document.querySelector("#task-completed");

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
        document.querySelector(".message").style.display = "none";
        userInput.value = "";
    }
    totalTasks.textContent=document.getElementsByTagName("li").length - 3;
})



todoLists.addEventListener('click', (e) => {
    console.log(e);
    let i=0;
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
        // e.target.childNodes[0].className="fa-solid fa-circle-check";
        e.target.childNodes[0].classList.toggle("fa-circle-check")
    }
    if (e.target.tagName === "INPUT") {
        e.target.parentElement.remove();
        totalTasks.textContent=(document.getElementsByTagName("li").length - 3);
    }

    if (document.getElementsByTagName("li").length == 3) {
        document.querySelector(".message").style.display = "block";
    }
    // 
});
