import axios from "axios"

const API_URL = "http://localhost:5000/api/projects"

const getToken = () => {
  return localStorage.getItem("token")
}

// CREATE PROJECT
export const createProject = async (projectData) => {
  const response = await axios.post(
    API_URL,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  return response.data
}

// GET PROJECTS
export const getProjects = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return response.data
}

// DELETE PROJECT
export const deleteProject = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  return response.data
}

// ADD MEMBER
export const addMember = async (
  projectId,
  email
) => {
  const response = await axios.put(
    `${API_URL}/${projectId}/add-member`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  return response.data
}