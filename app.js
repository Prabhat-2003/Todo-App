document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.querySelector('form');
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const wrapper = document.querySelector('.wrapper');
    
    // Create todo list UL if it doesn't exist
    let todoListUL = document.getElementById('todo-list');
    if (!todoListUL) {
        todoListUL = document.createElement('ul');
        todoListUL.id = 'todo-list';
        wrapper.appendChild(todoListUL);
    }
    
    let allTodos = [];
    
    // Form submission handler
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo();
    });
    
    // Add button click handler
    addButton.addEventListener('click', addTodo);
    
    // Add new todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText.length > 0) {
            allTodos.push({
                text: todoText,
                completed: false
            });
            updateTodoList();
            todoInput.value = "";
            saveTodos();
        }
    }
    
    function updateTodoList() {
        todoListUL.innerHTML = "";
        allTodos.forEach((todo, index) => {
            const todoItem = createTodoItem(todo, index);
            todoListUL.appendChild(todoItem);
        });
    }
    
    function createTodoItem(todo, index) {
        const todoId = "todo-" + index;
        const todoLI = document.createElement("li");
        todoLI.className = "todo";
        
        todoLI.innerHTML = `
            <input type="checkbox" id="${todoId}" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <label for="${todoId}" class="custom-checkbox">
                <span class="material-icons">check</span>
            </label>
            <label for="${todoId}" class="todo-text" style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</label>
            <button class="delete-button">
                <span class="material-icons">delete</span>
            </button>
        `;
        
        // Add event listeners
        const checkbox = todoLI.querySelector('.todo-checkbox');
        const deleteBtn = todoLI.querySelector('.delete-button');
        
        checkbox.addEventListener('change', function() {
            todo.completed = this.checked;
            const textLabel = this.nextElementSibling.nextElementSibling;
            textLabel.style.textDecoration = this.checked ? 'line-through' : 'none';
            saveTodos();
        });
        
        deleteBtn.addEventListener('click', function() {
            allTodos.splice(index, 1);
            updateTodoList();
            saveTodos();
        });
        
        return todoLI;
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(allTodos));
    }
    
    // Load todos from localStorage
    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            allTodos = JSON.parse(savedTodos);
            updateTodoList();
        }
    }
    
    // Load todos when page loads
    loadTodos();
});