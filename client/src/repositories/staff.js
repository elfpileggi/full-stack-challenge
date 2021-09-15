import axios from 'axios'

export const findBestStaffForAnswer = async (skillId, level) => {
  try {
    const response = await axios.get(`http://localhost:5000/staffs/best/${skillId}/${level}`)
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