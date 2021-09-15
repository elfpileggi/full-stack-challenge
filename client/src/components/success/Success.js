import React, { useContext, useEffect } from "react"
import { SessionContext } from "../../context/session"

import "./Success.css"

const Success = () => {
  const { cleanSession } = useContext(SessionContext)

  const close = () => {
    cleanSession()
  }

  return (
    <div className="success-frame">
      <div className="success-content">
        <div className="success-detail">
          <span className="title">Message sent!</span>
          <p>
            Congrats!
            The message wasn't actually sent, but thanks for making it this far.
          </p>
        </div>
        <a onClick={close} className="btn-send">CLOSE</a>
      </div>
    </div>
  )
}

export default Success


