import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-3">ProjectFlow</h1>
          <p className="text-lg text-blue-100">
            Smart project management for modern teams.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Start managing <br />
            projects smarter.
          </h2>

          <p className="text-blue-100 text-lg">
            Create projects, assign tasks, and collaborate with your team in one workspace.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-blue-100">Projects Managed</p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-blue-100">Productivity</p>
            </div>
          </div>
        </div>

        <p className="text-blue-200 text-sm">
          Join teams building faster every day.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800">
              Create Account
            </h2>
            <p className="text-slate-500 mt-2">
              Start managing your projects today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Email Address
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
                placeholder="Create password"
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
              Create Account
            </button>
          </form>

          <p className="text-center text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;