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
  const user = JSON.parse(localStorage.getItem("user"))

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [projects, setProjects] = useState([])
  const [memberEmails, setMemberEmails] = useState({})
  const [taskInputs, setTaskInputs] = useState({})
  const [tasks, setTasks] = useState({})
  const [commentInputs, setCommentInputs] = useState({})
  const [comments, setComments] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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

  const fetchComments = async (taskId) => {
    try {
      const data = await getComments(taskId)

      setComments((prev) => ({
        ...prev,
        [taskId]: data,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

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

  const handleDelete = async (id) => {
    try {
      await deleteProject(id)
      fetchProjects()
    } catch (error) {
      console.log(error)
    }
  }

  const handleMemberInputChange = (projectId, value) => {
    setMemberEmails({
      ...memberEmails,
      [projectId]: value,
    })
  }

  const handleAddMember = async (projectId) => {
    try {
      await addMember(projectId, memberEmails[projectId])

      setMemberEmails({
        ...memberEmails,
        [projectId]: "",
      })

      fetchProjects()
    } catch (error) {
      console.log(error)
    }
  }

  const handleTaskInputChange = (projectId, field, value) => {
    setTaskInputs({
      ...taskInputs,
      [projectId]: {
        ...taskInputs[projectId],
        [field]: value,
      },
    })
  }

  const handleCreateTask = async (projectId) => {
    try {
      await createTask({
        title: taskInputs[projectId]?.title || "",
        description:
          taskInputs[projectId]?.description || "",
        assignedTo:
          taskInputs[projectId]?.assignedTo || "",
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

  const handleStatusChange = async (
    taskId,
    status,
    projectId
  ) => {
    try {
      await updateTaskStatus(taskId, status)
      fetchTasks(projectId)
    } catch (error) {
      console.log(error)
    }
  }

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

  const handleCommentInputChange = (
    taskId,
    value
  ) => {
    setCommentInputs({
      ...commentInputs,
      [taskId]: value,
    })
  }

  const handleCreateComment = async (taskId) => {
    try {
      await createComment({
        text: commentInputs[taskId],
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

  const handleDeleteComment = async (
    commentId,
    taskId
  ) => {
    try {
      await deleteComment(commentId)
      fetchComments(taskId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  const columns = [
    {
      title: "Todo",
      badge: "bg-slate-500",
    },
    {
      title: "In Progress",
      badge: "bg-yellow-500",
    },
    {
      title: "Done",
      badge: "bg-green-500",
    },
  ]
    return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar handleLogout={handleLogout} />

        <div className="p-8">

          {/* WELCOME */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Welcome back, {user?.name || "User"} 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Here’s what’s happening with your projects today.
            </p>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <p className="text-gray-500">Projects</p>
              <h2 className="text-3xl font-bold">
                {projects.length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <p className="text-gray-500">Tasks</p>
              <h2 className="text-3xl font-bold">
                {Object.values(tasks).flat().length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <p className="text-gray-500">Completed</p>
              <h2 className="text-3xl font-bold text-green-600">
                {
                  Object.values(tasks)
                    .flat()
                    .filter(
                      (task) =>
                        task.status === "Done"
                    ).length
                }
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <p className="text-gray-500">In Progress</p>
              <h2 className="text-3xl font-bold text-yellow-500">
                {
                  Object.values(tasks)
                    .flat()
                    .filter(
                      (task) =>
                        task.status === "In Progress"
                    ).length
                }
              </h2>
            </div>
          </div>

          {/* CREATE PROJECT */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-10 border">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Create New Project
            </h2>

            <p className="text-gray-500 mb-8">
              Start managing a new project
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
                className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold">
                Create Project
              </button>
            </form>
          </div>

          {/* PROJECTS */}
          <div className="space-y-10">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow-sm p-8 border"
              >
                {/* PROJECT HEADER */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">
                      {project.title}
                    </h2>

                    <p className="text-gray-600 mt-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-5">
                      {project.members?.map((member) => (
                        <div
                          key={member._id}
                          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                        >
                          {member.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(project._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
                  >
                    Delete
                  </button>
                </div>

                {/* ADD MEMBER */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Add Team Member
                  </h3>

                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter member email"
                      value={
                        memberEmails[project._id] || ""
                      }
                      onChange={(e) =>
                        handleMemberInputChange(
                          project._id,
                          e.target.value
                        )
                      }
                      className="flex-1 border p-4 rounded-xl"
                    />

                    <button
                      onClick={() =>
                        handleAddMember(project._id)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-6 rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                </div>
                                {/* CREATE TASK */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Create Task
                  </h3>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={
                        taskInputs[project._id]?.title || ""
                      }
                      onChange={(e) =>
                        handleTaskInputChange(
                          project._id,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full border p-4 rounded-xl"
                    />

                    <input
                      type="text"
                      placeholder="Task Description"
                      value={
                        taskInputs[project._id]?.description || ""
                      }
                      onChange={(e) =>
                        handleTaskInputChange(
                          project._id,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full border p-4 rounded-xl"
                    />

                    <select
  value={taskInputs[project._id]?.assignedTo || ""}
  onChange={(e) =>
    handleTaskInputChange(
      project._id,
      "assignedTo",
      e.target.value
    )
  }
  className="w-full border p-4 rounded-xl"
>
  <option value="">Assign To</option>

  {project.members?.map((member) => (
    <option key={member._id} value={member._id}>
      {member.name}
    </option>
  ))}
</select>
                    <button
                      onClick={() =>
                        handleCreateTask(project._id)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                    >
                      Create Task
                    </button>
                  </div>
                </div>

                {/* TASK BOARD */}
                <div className="grid md:grid-cols-3 gap-6">
                  {columns.map((column) => (
                    <div
                      key={column.title}
                      className="bg-slate-50 rounded-2xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className={`w-4 h-4 rounded-full ${column.badge}`}
                        ></div>

                        <h3 className="text-xl font-bold">
                          {column.title}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {tasks[project._id]
                          ?.filter(
                            (task) =>
                              task.status === column.title
                          )
                          .map((task) => (
                            <div
                              key={task._id}
                              className="bg-white rounded-2xl p-5 shadow-sm border"
                            >
                              <h4 className="font-bold text-lg">
                                {task.title}
                              </h4>

                              <p className="text-gray-600 mt-2">
                                {task.description}
                              </p>

                              <p className="text-sm text-gray-500 mt-3">
                                   Assigned to: {task.assignedTo?.name || "Unassigned"}
                               </p>

                              <select
                                value={task.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    task._id,
                                    e.target.value,
                                    project._id
                                  )
                                }
                                className="w-full mt-4 border p-3 rounded-xl"
                              >
                                <option value="Todo">Todo</option>
                                <option value="In Progress">
                                  In Progress
                                </option>
                                <option value="Done">Done</option>
                              </select>

                              <button
                                onClick={() =>
                                  handleDeleteTask(
                                    task._id,
                                    project._id
                                  )
                                }
                                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
                              >
                                Delete Task
                              </button>

                              {/* COMMENTS */}
                              <div className="mt-5">
                                <h4 className="font-semibold mb-3">
                                  Comments
                                </h4>

                                <div className="space-y-2 mb-4">
                                  {comments[task._id]?.map(
                                    (comment) => (
                                      <div
                                        key={comment._id}
                                        className="bg-slate-100 rounded-xl p-3"
                                      >
                                        <p>{comment.text}</p>

                                        <button
                                          onClick={() =>
                                            handleDeleteComment(
                                              comment._id,
                                              task._id
                                            )
                                          }
                                          className="text-red-500 text-sm mt-2"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className="space-y-3">
                                  <input
                                    type="text"
                                    placeholder="Add comment"
                                    value={
                                      commentInputs[task._id] || ""
                                    }
                                    onChange={(e) =>
                                      handleCommentInputChange(
                                        task._id,
                                        e.target.value
                                      )
                                    }
                                    className="w-full border p-3 rounded-xl"
                                  />

                                  <button
                                    onClick={() =>
                                      handleCreateComment(
                                        task._id
                                      )
                                    }
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl"
                                  >
                                    Add Comment
                                  </button>
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