import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { taskApi } from "../services/api";

function Task() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const result = await taskApi.list();

      setTasks(
        result.tasks ||
          result.data?.tasks ||
          result.data ||
          []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    loadTasks();
  }, []);

  async function handleSubmit(data) {
    try {
      setSaving(true);
      setError("");

      if (editingTask) {
        const result = await taskApi.update(
          editingTask._id,
          data
        );

        const updated =
          result.task ||
          result.data?.task ||
          result.data;

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTask._id
              ? updated
              : task
          )
        );

        setEditingTask(null);
      } else {
        const result = await taskApi.create(data);

        const created =
          result.task ||
          result.data?.task ||
          result.data;

        setTasks((prevTasks) => [
          ...prevTasks,
          created,
        ]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    try {
      setError("");

      await taskApi.remove(id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">
            Task Manager
          </h1>

          <Button
            variant="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 p-4 md:grid-cols-[320px_1fr]">
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => setEditingTask(null)}
          loading={saving}
        />

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Your Tasks
          </h2>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default Task;