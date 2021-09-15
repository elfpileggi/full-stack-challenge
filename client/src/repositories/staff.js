import axios from 'axios'

export const findBestStaffForAnswer = async (studentId, skillId, level) => {
  try {
    const response = await axios.get(`http://localhost:5000/staff/best/${skillId}/${level}/student/${studentId}`)
    return response.status === 200 ? { success: true, data: response.data } : { success: false, message: 'Parameters with format incorrect' }
  } catch (error) {
    return { success: false, message: 'Skills not found' }
  }
}

export const getStaffInfo = async (type, id) => {
  try {
    const response = await axios.get(`http://localhost:5000/staff/${type}/${id}`)
    return response.status === 200 ? { success: true, data: response.data } : { success: false, message: 'Staff Id format is incorrect' }
  } catch (error) {
    return { success: false, message: 'Skills not found' }
  }
}