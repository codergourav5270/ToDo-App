import React, { useState } from "react";

const isOverdue = (dueDateStr) => {
  if (!dueDateStr) return false;
  const today = new Date();
  const due = new Date(dueDateStr + "T23:59:59");
  return due < today && !isSameDay(due, today);
};

const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState({ title: task.title, priority: task.priority, dueDate: task.dueDate || "" });

  const save = () => {
    if (!local.title.trim()) return alert("Title can't be empty");
    onEdit(task.id, { title: local.title, priority: local.priority, dueDate: local.dueDate });
    setEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="left">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      </div>

      <div className="middle">
        {editing ? (
          <>
            <input value={local.title} onChange={(e) => setLocal((p) => ({ ...p, title: e.target.value }))} />
            <select value={local.priority} onChange={(e) => setLocal((p) => ({ ...p, priority: e.target.value }))}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input type="date" value={local.dueDate} onChange={(e) => setLocal((p) => ({ ...p, dueDate: e.target.value }))} />
          </>
        ) : (
          <>
            <div className="title-row">
              <span className="title">{task.title}</span>
              <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
            </div>
            <div className="meta">
              {task.dueDate ? (
                <span className={`due ${isOverdue(task.dueDate) ? "overdue" : ""}`}>Due: {task.dueDate}</span>
              ) : (
                <span className="due">No due date</span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="right">
        {editing ? (
          <>
            <button onClick={save}>Save</button>
            <button onClick={() => { setEditing(false); setLocal({ title: task.title, priority: task.priority, dueDate: task.dueDate || "" }); }}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
