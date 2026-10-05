import "../index.css";
import { useState } from "react";

function Project() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Create Project</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-slate-700">Project Name</label>
            <br />

            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <br />

          <div>
            <label className="text-sm font-medium text-slate-700">Description</label>
            <br />

            <textarea
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <br />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
             Create Project
        </button>
        </form>
      </div>
    </div>
  );
}

export default Project;