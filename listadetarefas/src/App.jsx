import { useState } from "react";
import "./App.css"; // Importando os estilos externos

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function addTask() {
    if (task.trim() === "") return;
    const newTodo = { id: Date.now(), text: task, completed: false };
    setTodos([...todos, newTodo]);
    setTask("");
  }

  function deleteTask(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <div className="container">
      <h1>Lista de tarefas</h1>

      <div className="input-area">
        <input
          type="text"
          className="input-field"
          placeholder="Adicionar nova tarefa..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()} // Atalho de teclado
        />
        <button className="add-button" onClick={addTask}>
          +
        </button>
      </div>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="list-item">
            <span
              className={`todo-text ${todo.completed ? "completed" : ""}`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button
              className="delete-button"
              onClick={() => deleteTask(todo.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ color: "#888" }}>Sua lista está vazia.</p>
      )}
    </div>
  );
}
