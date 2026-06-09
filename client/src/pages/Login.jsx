import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { loginUser } from "../services/authService"



function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await loginUser(formData)

      // STORE TOKEN
      localStorage.setItem(
        "token",
        data.token
      )

      // REDIRECT
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      alert("Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8">
        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Welcome Back
          </h1>

          <p className="text-white/80">
            Login to continue your
            workspace
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* EMAIL */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-2xl bg-white/80 outline-none focus:ring-4 focus:ring-blue-300 transition"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={
                formData.password
              }
              onChange={handleChange}
              className="w-full p-3 rounded-2xl bg-white/80 outline-none focus:ring-4 focus:ring-purple-300 transition"
              required
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-white text-purple-700 font-bold py-3 rounded-2xl hover:scale-105 hover:bg-purple-100 transition duration-300 shadow-lg">
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-white/80 mt-6">
          Manage your projects
          efficiently 🚀
        </p>
      </div>
    </div>
  )
}

export default Login