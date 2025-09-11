function getTodosFromCookies() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "todos") {
            try {
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
    $('#ft_list').empty();
    todos.forEach((todo, idx) => {
        const $div = $('<div></div>')
            .addClass('todo')
            .text(todo)
            .on('click', function () {
                if (confirm("Do you want to delete this TO DO?")) {
                    todos.splice(idx, 1);
                    saveTodosToCookies(todos);
                    renderTodos();
                }
            });
        $('#ft_list').append($div);
    });
}

let todos = getTodosFromCookies();

$(function () {
    $('#new-btn').on('click', function () {
        const text = prompt("Enter a new TO DO:");
        if (text && text.trim() !== "") {
            todos.unshift(text.trim());
            saveTodosToCookies(todos);
            renderTodos();
        }
    });
    renderTodos();
});