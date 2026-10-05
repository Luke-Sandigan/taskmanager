import "../index.css";
import { useEffect, useState } from "react";
import { projectApi } from "../services/api";

function Project() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await projectApi.list();
        setProjects(response.data || []);
      } catch (error) {
        setError(error.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!projectName.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await projectApi.create({
        name: projectName,
        description: description,
      });

      setProjects([...projects, response.data]);
      setProjectName("");
      setDescription("");
    } catch (error) {
      setError(error.message || "Failed to create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">
          Create Project
        </h1>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Project Name
            </label>

            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Create Project"}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Projects
          </h2>

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          {loading && projects.length === 0 && (
            <p className="text-sm text-slate-500">
              Loading projects...
            </p>
          )}

          {!loading && filteredProjects.length === 0 && (
            <p className="text-sm text-slate-500">
              No projects found.
            </p>
          )}

          {filteredProjects.map((project) => (
            <div
              key={project._id || project.id}
              className="mb-4 rounded-lg border border-slate-200 p-4"
            >
              <h3 className="font-semibold text-slate-900">
                {project.name}
              </h3>

              {project.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {project.description}
                </p>
              )}

              {project.tasks && (
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
                  {project.tasks.map((task, index) => (
                    <li key={task._id || index}>
                      {typeof task === "string"
                        ? task
                        : task.title || task.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;