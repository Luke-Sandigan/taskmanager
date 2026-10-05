import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 px-4 py-3 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <h1 className="font-bold">Task Manager</h1>

        <div className="flex gap-4 text-sm">
          <Link to="/login" className="hover:text-blue-300">
            Login
          </Link>

          <Link to="/tasks" className="hover:text-blue-300">
            Tasks
          </Link>

          <Link to="/projects" className="hover:text-blue-300">
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;