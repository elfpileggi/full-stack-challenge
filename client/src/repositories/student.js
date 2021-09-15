import axios from 'axios'

export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/students/${id}`)
    return response.status === 200 ? { success: true, data: response.data } : { success: false, message: 'Student Id format is incorrect' }
  } catch (error) {
    return { success: false, message: 'Student not found' }
  }
}