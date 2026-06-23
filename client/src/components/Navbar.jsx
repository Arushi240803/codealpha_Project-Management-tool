function Navbar({ handleLogout }) {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-slate-800">
            {user?.name || "User"}
          </p>
          <p className="text-sm text-gray-500">
            Team Member
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {(user?.name || "U")[0].toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar