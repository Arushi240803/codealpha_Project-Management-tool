function Navbar({ handleLogout }) {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        Project Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar