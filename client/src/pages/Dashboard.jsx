import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

import {
  createProject,
  getProjects,
  deleteProject,
  addMember,
} from "../services/projectService"

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../services/taskService"

import {
  createComment,
  getComments,
  deleteComment,
} from "../services/commentService"

function Dashboard() {
  const navigate = useNavigate()

  // PROJECT FORM
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  // STATES
  const [projects, setProjects] = useState([])
  const [memberEmails, setMemberEmails] =
    useState({})
  const [taskInputs, setTaskInputs] =
    useState({})
  const [tasks, setTasks] = useState({})
  const [commentInputs, setCommentInputs] =
    useState({})
  const [comments, setComments] =
    useState({})

  // PROJECT INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const data = await getProjects()

      setProjects(data)

      data.forEach((project) => {
        fetchTasks(project._id)
      })
    } catch (error) {
      console.log(error)
    }
  }

  // FETCH TASKS
  const fetchTasks = async (projectId) => {
    try {
      const data = await getTasks(projectId)

      setTasks((prev) => ({
        ...prev,
        [projectId]: data,
      }))

      data.forEach((task) => {
        fetchComments(task._id)
      })
    } catch (error) {
      console.log(error)
    }
  }

  // FETCH COMMENTS
  const fetchComments = async (
    taskId
  ) => {
    try {
      const data =
        await getComments(taskId)

      setComments((prev) => ({
        ...prev,
        [taskId]: data,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  // LOAD DATA
  useEffect(() => {
    fetchProjects()
  }, [])

  // CREATE PROJECT
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createProject(formData)

      setFormData({
        title: "",
        description: "",
      })

      fetchProjects()
    } catch (error) {
      console.log(error)
    }
  }

  // DELETE PROJECT
  const handleDelete = async (id) => {
    try {
      await deleteProject(id)

      fetchProjects()
    } catch (error) {
      console.log(error)
    }
  }

  // MEMBER INPUT
  const handleMemberInputChange = (
    projectId,
    value
  ) => {
    setMemberEmails({
      ...memberEmails,
      [projectId]: value,
    })
  }

  // ADD MEMBER
  const handleAddMember = async (
    projectId
  ) => {
    try {
      await addMember(
        projectId,
        memberEmails[projectId]
      )

      setMemberEmails({
        ...memberEmails,
        [projectId]: "",
      })

      fetchProjects()
    } catch (error) {
      console.log(error)
    }
  }

  // TASK INPUT
  const handleTaskInputChange = (
    projectId,
    field,
    value
  ) => {
    setTaskInputs({
      ...taskInputs,
      [projectId]: {
        ...taskInputs[projectId],
        [field]: value,
      },
    })
  }

  // CREATE TASK
  const handleCreateTask = async (
    projectId
  ) => {
    try {
      await createTask({
        title:
          taskInputs[projectId]?.title ||
          "",
        description:
          taskInputs[projectId]
            ?.description || "",
        assignedTo:
          taskInputs[projectId]
            ?.assignedTo || "",
        projectId,
      })

      setTaskInputs({
        ...taskInputs,
        [projectId]: {
          title: "",
          description: "",
          assignedTo: "",
        },
      })

      fetchTasks(projectId)
    } catch (error) {
      console.log(error)
    }
  }

  // UPDATE STATUS
  const handleStatusChange = async (
    taskId,
    status,
    projectId
  ) => {
    try {
      await updateTaskStatus(
        taskId,
        status
      )

      fetchTasks(projectId)
    } catch (error) {
      console.log(error)
    }
  }

  // DELETE TASK
  const handleDeleteTask = async (
    taskId,
    projectId
  ) => {
    try {
      await deleteTask(taskId)

      fetchTasks(projectId)
    } catch (error) {
      console.log(error)
    }
  }

  // COMMENT INPUT
  const handleCommentInputChange = (
    taskId,
    value
  ) => {
    setCommentInputs({
      ...commentInputs,
      [taskId]: value,
    })
  }

  // CREATE COMMENT
  const handleCreateComment =
    async (taskId) => {
      try {
        await createComment({
          text:
            commentInputs[taskId],
          taskId,
        })

        setCommentInputs({
          ...commentInputs,
          [taskId]: "",
        })

        fetchComments(taskId)
      } catch (error) {
        console.log(error)
      }
    }

  // DELETE COMMENT
  const handleDeleteComment =
    async (commentId, taskId) => {
      try {
        await deleteComment(commentId)

        fetchComments(taskId)
      } catch (error) {
        console.log(error)
      }
    }

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  // STATUS COLUMNS
  const columns = [
    {
      title: "Todo",
      color:
        "from-gray-500 to-gray-700",
      badge: "bg-gray-500",
    },
    {
      title: "In Progress",
      color:
        "from-yellow-400 to-orange-500",
      badge: "bg-yellow-500",
    },
    {
      title: "Done",
      color:
        "from-green-400 to-green-600",
      badge: "bg-green-500",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1">
        
        {/* NAVBAR */}
        <Navbar
          handleLogout={handleLogout}
        />

        <div className="p-6">

          {/* CREATE PROJECT */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-10 border border-white/40">
            
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
              Project Workspace
            </h2>

            <p className="text-gray-500 mb-8">
              Create and manage your
              projects beautifully
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-xl transition duration-300">
                Create Project
              </button>
            </form>
          </div>

          {/* PROJECTS */}
          <div className="space-y-12">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/40"
              >
                
                {/* PROJECT HEADER */}
                <div className="flex justify-between items-start mb-8">
                  
                  <div>
                    <h2 className="text-4xl font-extrabold text-gray-800">
                      {project.title}
                    </h2>

                    <p className="text-gray-600 mt-3 text-lg">
                      {
                        project.description
                      }
                    </p>

                    {/* MEMBERS */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {project.members?.map(
                        (member) => (
                          <div
                            key={
                              member._id
                            }
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md"
                          >
                            {member.name}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        project._id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg transition"
                  >
                    Delete
                  </button>
                </div>

                {/* ADD MEMBER */}
                <div className="bg-gray-50 rounded-3xl p-6 mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Add Team Member
                  </h3>

                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter member email"
                      value={
                        memberEmails[
                          project._id
                        ] || ""
                      }
                      onChange={(e) =>
                        handleMemberInputChange(
                          project._id,
                          e.target.value
                        )
                      }
                      className="flex-1 border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <button
                      onClick={() =>
                        handleAddMember(
                          project._id
                        )
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-6 rounded-2xl font-semibold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* CREATE TASK */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-6 mb-10 border border-purple-100">
                  
                  <h3 className="text-3xl font-bold text-gray-800 mb-5">
                    Create Task
                  </h3>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={
                        taskInputs[
                          project._id
                        ]?.title || ""
                      }
                      onChange={(e) =>
                        handleTaskInputChange(
                          project._id,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    <textarea
                      placeholder="Task Description"
                      value={
                        taskInputs[
                          project._id
                        ]?.description || ""
                      }
                      onChange={(e) =>
                        handleTaskInputChange(
                          project._id,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    <select
                      value={
                        taskInputs[
                          project._id
                        ]?.assignedTo || ""
                      }
                      onChange={(e) =>
                        handleTaskInputChange(
                          project._id,
                          "assignedTo",
                          e.target.value
                        )
                      }
                      className="w-full border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">
                        Assign Member
                      </option>

                      {project.members?.map(
                        (member) => (
                          <option
                            key={
                              member._id
                            }
                            value={
                              member._id
                            }
                          >
                            {member.name}
                          </option>
                        )
                      )}
                    </select>

                    <button
                      onClick={() =>
                        handleCreateTask(
                          project._id
                        )
                      }
                      className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition duration-300"
                    >
                      Create Task
                    </button>
                  </div>
                </div>

                {/* TASK BOARD */}
                <div className="grid lg:grid-cols-3 gap-6">
                  
                  {columns.map((column) => (
                    <div
                      key={column.title}
                      className="bg-white rounded-3xl shadow-xl p-5 border border-gray-200"
                    >
                      
                      {/* COLUMN HEADER */}
                      <div className="flex items-center justify-between mb-6">
                        
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full bg-gradient-to-r ${column.color}`}
                          ></div>

                          <h3 className="text-2xl font-bold text-gray-800">
                            {column.title}
                          </h3>
                        </div>

                        <div
                          className={`${column.badge} text-white px-3 py-1 rounded-full text-sm`}
                        >
                          {
                            tasks[
                              project._id
                            ]?.filter(
                              (task) =>
                                task.status ===
                                column.title
                            ).length
                          }
                        </div>
                      </div>

                      {/* TASKS */}
                      <div className="space-y-5 max-h-[700px] overflow-y-auto">
                        
                        {tasks[
                          project._id
                        ]
                          ?.filter(
                            (task) =>
                              task.status ===
                              column.title
                          )
                          .map((task) => (
                            <div
                              key={task._id}
                              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-5 shadow-md border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                            >
                              
                              {/* TITLE */}
                              <div className="flex justify-between items-start mb-3">
                                
                                <h4 className="font-bold text-xl text-gray-800">
                                  {
                                    task.title
                                  }
                                </h4>

                                <span
                                  className={`${column.badge} text-white text-xs px-3 py-1 rounded-full`}
                                >
                                  {
                                    task.status
                                  }
                                </span>
                              </div>

                              {/* DESCRIPTION */}
                              <p className="text-gray-600 mb-5">
                                {
                                  task.description
                                }
                              </p>

                              {/* ASSIGNED USER */}
                              <div className="flex items-center gap-3 mb-5">
                                
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-md">
                                  {task.assignedTo?.name
                                    ?.charAt(
                                      0
                                    )
                                    ?.toUpperCase() ||
                                    "U"}
                                </div>

                                <div>
                                  <p className="font-semibold">
                                    {task
                                      .assignedTo
                                      ?.name ||
                                      "Unassigned"}
                                  </p>

                                  <p className="text-sm text-gray-500">
                                    Assigned User
                                  </p>
                                </div>
                              </div>

                              {/* ACTION BUTTONS */}
                              <div className="flex flex-wrap gap-2 mb-5">
                                
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      task._id,
                                      "Todo",
                                      project._id
                                    )
                                  }
                                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-xl text-sm"
                                >
                                  Todo
                                </button>

                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      task._id,
                                      "In Progress",
                                      project._id
                                    )
                                  }
                                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-xl text-sm"
                                >
                                  Progress
                                </button>

                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      task._id,
                                      "Done",
                                      project._id
                                    )
                                  }
                                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl text-sm"
                                >
                                  Done
                                </button>

                                <button
                                  onClick={() =>
                                    handleDeleteTask(
                                      task._id,
                                      project._id
                                    )
                                  }
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm"
                                >
                                  Delete
                                </button>
                              </div>

                              {/* COMMENTS */}
                              <div className="border-t pt-4">
                                
                                <h4 className="font-bold text-lg mb-4">
                                  Comments
                                </h4>

                                {/* ADD COMMENT */}
                                <div className="flex gap-2 mb-4">
                                  <input
                                    type="text"
                                    placeholder="Write comment..."
                                    value={
                                      commentInputs[
                                        task
                                          ._id
                                      ] || ""
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      handleCommentInputChange(
                                        task._id,
                                        e
                                          .target
                                          .value
                                      )
                                    }
                                    className="border p-3 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  />

                                  <button
                                    onClick={() =>
                                      handleCreateComment(
                                        task._id
                                      )
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-xl"
                                  >
                                    Send
                                  </button>
                                </div>

                                {/* COMMENTS LIST */}
                                <div className="space-y-3 max-h-52 overflow-y-auto">
                                  
                                  {comments[
                                    task._id
                                  ]?.map(
                                    (
                                      comment
                                    ) => (
                                      <div
                                        key={
                                          comment._id
                                        }
                                        className="flex gap-3 items-start"
                                      >
                                        
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                          {comment.user?.name
                                            ?.charAt(
                                              0
                                            )
                                            ?.toUpperCase()}
                                        </div>

                                        <div className="bg-gray-100 rounded-2xl px-4 py-3 w-full">
                                          
                                          <div className="flex justify-between items-center mb-1">
                                            <h5 className="font-semibold text-sm">
                                              {
                                                comment
                                                  .user
                                                  ?.name
                                              }
                                            </h5>

                                            <span className="text-xs text-gray-500">
                                              {new Date(
                                                comment.createdAt
                                              ).toLocaleString()}
                                            </span>
                                          </div>

                                          <p className="text-sm text-gray-700">
                                            {
                                              comment.text
                                            }
                                          </p>

                                          <button
                                            onClick={() =>
                                              handleDeleteComment(
                                                comment._id,
                                                task._id
                                              )
                                            }
                                            className="text-red-500 text-xs mt-2 hover:underline"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard