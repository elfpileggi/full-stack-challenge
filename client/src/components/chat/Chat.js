import React, { useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { SessionContext } from "../../context/session"
import { getStaffInfo } from "../../repositories/staff"
import "./Chat.css"

const Chat = () => {
  const history = useHistory()
  const { skill, staff, setStaff } = useContext(SessionContext)

  const fetchStaffDetail = async () => {
    const response = await getStaffInfo(staff.type, staff.id)
    if (response.success) {
      setStaff(response.data)
    }
  }

  const getType = (type) => {
    return type === 'faculty' ? 'Faculty Member' : 'Student'
  }

  const sendMessage = () => {
    history.push('/success')
  }

  useEffect(() => {
    fetchStaffDetail()
  }, [])

  return (
    <div className="chat-frame">
      <div className="chat-content">
        <div className="chat-form">
          <div className="chat-detail">
            <span className="title">Take Question</span>
            <span>{staff.name} - {getType(staff.type)}</span>
            <span>{skill.title}</span>
          </div>
          <textarea id="message" name="message" cols="40" rows="5"></textarea>
          <a className="btn-send" onClick={sendMessage}>SEND</a>
        </div>
      </div>
    </div>
  )
}

export default Chat


