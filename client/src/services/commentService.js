import axios from "axios"

const API_URL =
  "http://localhost:5000/api/comments"

const getToken = () => {
  return localStorage.getItem("token")
}

// CREATE COMMENT
export const createComment =
  async (commentData) => {
    const response = await axios.post(
      API_URL,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )

    return response.data
  }

// GET COMMENTS
export const getComments = async (
  taskId
) => {
  const response = await axios.get(
    `${API_URL}/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  return response.data
}

// DELETE COMMENT
export const deleteComment =
  async (commentId) => {
    const response =
      await axios.delete(
        `${API_URL}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

    return response.data
  }