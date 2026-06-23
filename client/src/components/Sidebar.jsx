function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-[#0F172A] text-white hidden md:flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-3xl font-bold">ProjectFlow</h1>
        </div>

        <div className="p-4">
          <div className="bg-blue-600 p-4 rounded-xl cursor-pointer font-semibold">
            Dashboard
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="font-semibold mb-2">Upgrade to Pro</p>
          <p className="text-sm text-gray-400">
            Unlock premium features
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar