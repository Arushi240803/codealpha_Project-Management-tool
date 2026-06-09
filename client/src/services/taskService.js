import axios from "axios"

const API_URL =
  "http://localhost:5000/api/tasks"

const getToken = () => {
  return localStorage.getItem("token")
}

// CREATE TASK
export const createTask = async (
  taskData
) => {
  const response = await axios.post(
    API_URL,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  return response.data
}

// GET TASKS
export const getTasks = async (
  projectId
) => {
  const response = await axios.get(
    `${API_URL}/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  return response.data
}

// UPDATE TASK STATUS
export const updateTaskStatus =
  async (taskId, status) => {
    const response = await axios.put(
      `${API_URL}/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )

    return response.data
  }

// DELETE TASK
export const deleteTask = async (
  taskId
) => {
  const response = await axios.delete(
    `${API_URL}/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  return response.data
}