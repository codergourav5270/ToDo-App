import React, { useState } from "react";

const initial = { title: "", priority: "Medium", dueDate: "" };

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Please enter a task title");
    onAdd({ ...form });
    setForm(initial);
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <input
        type="text"
        placeholder="Add a task..."
        value={form.title}
        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
      />
      <select
        value={form.priority}
        onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
      />
      <button type="submit">Add</button>
    </form>
  );
}
