import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

// REGISTER USER
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/auth/register`,
    userData
  )

  return response.data
}

// LOGIN USER
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/auth/login`,
    userData
  )

  return response.data
}