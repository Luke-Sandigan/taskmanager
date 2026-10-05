import Button from "../common/Button";

function TaskList({ tasks, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <p className="text-slate-500">
        Loading tasks...
      </p>
    );
  }

  if (!tasks.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No tasks yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <div>
              <h3 className="font-semibold text-slate-900">
                {task.title}
              </h3>

              <p className="mt-1 text-slate-600">
                {task.description}
              </p>

              {task.status && (
                <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-1 text-xs">
                  {task.status}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onEdit(task)}
                variant="secondary"
              >
                Edit
              </Button>

              <Button
                onClick={() => onDelete(task._id)}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;