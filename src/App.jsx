import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
// import "./index.css";

const STORAGE_KEY = "react_todo_tasks_v1";
const THEME_KEY = "react_todo_theme_v1";

function App() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTasks(JSON.parse(stored));
    const t = localStorage.getItem(THEME_KEY);
    if (t) setTheme(t);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const addTask = (task) => {
    setTasks((prev) => [{ ...task, id: Date.now(), completed: false }, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const editTask = (id, updates) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const filtered = tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  const finalList = sortByPriority
    ? [...filtered].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    : filtered;

  return (
    <div className="app-container">
      <header className="header">
        <h1>To-Do App</h1>
        <div className="controls">
          <input
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tasks"
            className="search"
          />
          <label className="sort">
            <input
              type="checkbox"
              checked={sortByPriority}
              onChange={(e) => setSortByPriority(e.target.checked)}
            />
            Sort by priority
          </label>
          <button
            className="theme-toggle"
            onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </header>

      <main>
        <TaskForm onAdd={addTask} />
        <TaskList
          tasks={finalList}
          onDelete={deleteTask}
          onToggle={toggleComplete}
          onEdit={editTask}
        />
        {finalList.length === 0 && <p className="empty">No tasks found — try adding some!</p>}
      </main>

      <footer className="footer">
        <small>Persisted in localStorage • Built with React Hooks</small>
      </footer>
    </div>
  );
}

export default App;
