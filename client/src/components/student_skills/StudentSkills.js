import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { SessionContext } from "../../context/session"
import { getSkillsByStudentId } from "../../repositories/skills"
import { findBestStaffForAnswer } from "../../repositories/staff"

import "./StudentSkills.css"

const Student = (props) => {
  const history = useHistory()
  const { student, setStaff, setSkill } = useContext(SessionContext)
  const [skills, setSkills] = useState([])

  const fetchSkills = async () => {
    const result = await getSkillsByStudentId(student.id)
    if (result.success) {
      setSkills(result.data)
    }
  }

  const askAboutSkill = (id, level, title) => async () => {
    const result = await findBestStaffForAnswer(id, level)
    if (result.success) {
      setSkill({ id, title })
      setStaff(result.data)
      history.push('/chat')
    }
  }

  const renderSkill = (skill) => {
    const level = student.skills.reduce((acc, item) => item.id === skill.id ? item.level : acc, 0)
    const levelText = Array(level).fill().reduce((acc) => acc + '\u2022', '')
    return (
      <>
        <span key={`${skill.id}-1`}>{skill.title}</span>
        <span key={`${skill.id}-2`} className="level-ball">{levelText}</span>
        <span key={`${skill.id}-3`}>
          <a className="btn-ask" onClick={askAboutSkill(skill.id, level, skill.title)}>Ask</a>
        </span>
      </>
    )
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  return (
    <div className="student-skills-frame">
      <div className="student-skills-content">
        <div className="details-table">
          <span>
            <strong>Name</strong>
          </span>
          <span>{student.name}</span>
          <span>
            <strong>Email</strong>
          </span>
          <span>{student.email}</span>
          <span>
            <strong>House</strong>
          </span>
          <span>{student.house}</span>
        </div>
        <div className="skills-table">
          <span>
            <strong>Title</strong>
          </span>
          <span>
            <strong>Level</strong>
          </span>
          <span></span>
          {skills.map(renderSkill)}
        </div>
      </div>
    </div>
  )
}

export default Student
