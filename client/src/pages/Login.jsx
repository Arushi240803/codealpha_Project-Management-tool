import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      console.log("Login Response:", data);

      localStorage.setItem("token", data.token);

      // Store user if backend returns user object
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-3">ProjectFlow</h1>
          <p className="text-lg text-blue-100">
            Manage projects, teams, and tasks efficiently.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Collaborate smarter. <br />
            Deliver faster.
          </h2>

          <p className="text-blue-100 text-lg">
            One platform for project planning, task management, and team collaboration.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-blue-100">Active Users</p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">99.9%</h3>
              <p className="text-blue-100">Uptime</p>
            </div>
          </div>
        </div>

        <p className="text-blue-200 text-sm">
          Trusted by teams worldwide.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2">
              Sign in to your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-slate-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;