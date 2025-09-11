function getTodosFromCookies() {
    console.log(document.cookie);
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "todos") {
            try {
                console.log(decodeURIComponent(value));
                return JSON.parse(decodeURIComponent(value));
            } catch {
                return [];
            }
        }
    }
    return [];
}

function saveTodosToCookies(todos) {
    document.cookie =
        "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function renderTodos() {
    ft_list.innerHTML = "";
    todos.forEach((todo, idx) => {
        const div = document.createElement("div");
        div.className = "todo";
        div.textContent = todo;
        div.onclick = function () {
            if (confirm("Do you want to delete this TO DO?")) {
                todos.splice(idx, 1);
                saveTodosToCookies(todos);
                renderTodos();
            }
        };
        ft_list.appendChild(div);
    });
}

const ft_list = document.getElementById("ft_list");
const newBtn = document.getElementById("new-btn");
let todos = getTodosFromCookies();

newBtn.onclick = function () {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
        todos.unshift(text.trim());
        saveTodosToCookies(todos);
        renderTodos();
    }
};

renderTodos();