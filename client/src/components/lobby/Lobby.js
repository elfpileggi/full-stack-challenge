import React, { useContext } from "react"
import { useHistory } from 'react-router-dom'
import { getStudentById } from '../../repositories/student'
import { SessionContext } from "../../context/session"
import "./Lobby.css"

const Lobby = () => {
  const history = useHistory()
  const { setStudent } = useContext(SessionContext)
  const findStudent = async () => {
    const id = document.getElementById('student_id').value
    const result = await getStudentById(id)
    if (result.success) {
      setStudent(result.data)
      history.push('/student')
    } else {
      document.getElementById('lobby').classList.add('error')
      setTimeout(() => {
        document.getElementById('lobby').classList.remove('error')
      }, 500)
    }
  }

  return (
    <div id="lobby" className="lobby-frame">
      <div className="lobby-content">
        <div className="lobby-form">
          <h1>LOBBY</h1>
          <input id="student_id" className="text" type="text" placeholder="Type your Student ID here" />
          <a className="button" onClick={findStudent}>NEXT</a>
        </div>
      </div>
    </div>
  )
}

export default Lobby


