const userInput = document.querySelector(".userInput");
const addBtn = document.querySelector(".btn");
const todoLists = document.querySelector(".todo");

addBtn.addEventListener("click", () => {
    if (userInput.value == "") {
        alert("You must have to write something.");
    }
    else {
        const todoes = document.createElement("li");
        const task = userInput.value.trim();
        todoes.innerHTML = `<span>⏺️</span>${task}  
    <input type="button" value="X" class="btn-danger close">
  `
        todoLists.appendChild(todoes);
        document.querySelector(".message").style.display = "none";
        userInput.value = "";
    }
})



todoLists.addEventListener('click', (e) => {
    console.log(e);
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
    }
    if (e.target.tagName === "INPUT") {
        e.target.parentElement.remove();
    }

    if (document.getElementsByTagName("li").length == 3) {
        document.querySelector(".message").style.display = "block";
    }
})


