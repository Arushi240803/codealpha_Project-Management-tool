function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-6 hidden md:block">
      <h1 className="text-3xl font-bold mb-10">
        TaskFlow
      </h1>

      <div className="space-y-4">
        <div className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-700 transition">
          Dashboard
        </div>

        <div className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-700 transition">
          Projects
        </div>

        <div className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-700 transition">
          Tasks
        </div>

        <div className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-700 transition">
          Team
        </div>
      </div>
    </div>
  )
}

export default Sidebar