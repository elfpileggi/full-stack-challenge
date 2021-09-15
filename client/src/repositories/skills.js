import axios from 'axios'

export const getSkillsByStudentId = async (studentId) => {
  try {
    const response = await axios.get(`http://localhost:5000/student/${studentId}/skills`)
    return response.status === 200 ? { success: true, data: response.data } : { success: false, message: 'Student Id format is incorrect' }
  } catch (error) {
    return { success: false, message: 'Skills not found' }
  }
}