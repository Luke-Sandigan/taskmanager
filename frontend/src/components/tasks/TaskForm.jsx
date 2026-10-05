import { useEffect, useState } from "react";
import Button from "../common/Button";

const emptyTask = { title: "", description: "" };

function TaskForm({ task, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(emptyTask);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(task ? {
      title: task.title || "",
      description: task.description || "",
    } : emptyTask);
    setError("");
  }, [task]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }
    setError("");
    await onSubmit(form);
    if (!task) setForm(emptyTask);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
      <h2 className="mb-4 text-xl font-semibold">{task ? "Edit Task" : "Create Task"}</h2>

      {error && <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Task description"
            rows="4"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : task ? "Update Task" : "Create Task"}</Button>
          {task && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
