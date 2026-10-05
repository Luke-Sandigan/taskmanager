import "../index.css";
import { useEffect, useState } from "react";
import { projectApi } from "../services/api";

function Project() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  async function loadProjects() {
    try {
      const response = await projectApi.list();
      setProjects(response.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  loadProjects();
}, []);

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await projectApi.create({
      name: projectName,
      description: description,
    });

    setProjects([...projects, response.data]);
    setProjectName("");
    setDescription("");
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Create Project</h1>

        <form onSubmit={handleSubmit}>
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

        <div className="mt-8">
  <h2 className="mb-4 text-xl font-bold text-slate-900">Projects</h2>
  {projects.map((project) => (
  <div
    key={project.id}
    className="mb-4 rounded-lg border border-slate-200 p-4"
  >
    <h3 className="font-semibold text-slate-900">{project.name}</h3>

    <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
  {project.tasks.map((task, index) => (
    <li key={index}>{task}</li>
  ))}
</ul>
  </div>
))}
</div>
      </div>
    </div>
  );
}

export default Project;