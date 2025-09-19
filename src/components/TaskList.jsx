import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
      ))}
    </ul>
  );
}
