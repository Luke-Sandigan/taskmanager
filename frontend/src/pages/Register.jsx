import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/common/FormInput";
import Button from "../components/common/Button";
import { authApi } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (!form.username.trim()) next.username = "Username is required.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length) return;

    try {
      setLoading(true);
      await authApi.register(form);
      navigate("/");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
        <p className="mb-6 mt-1 text-sm text-slate-500">Register with a username and password.</p>

        {serverError && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}

        <div className="space-y-4">
          <FormInput
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Enter username"
            error={errors.username}
          />
          <FormInput
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="At least 6 characters"
            error={errors.password}
          />
          <Button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</Button>
        </div>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account? <Link className="font-medium text-blue-600 hover:underline" to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
