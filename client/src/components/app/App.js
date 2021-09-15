import React, { useContext, useEffect } from "react"
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { PageTransition } from '@steveeeie/react-page-transition'
import { SessionContext } from "../../context/session"

import Lobby from "../lobby/Lobby"
import StudentSkills from "../student_skills/StudentSkills"
import Chat from "../chat/Chat"
import Success from "../success/Success"

import "./App.css"

const App = () => {
  const { student } = useContext(SessionContext)

  useEffect(() => {
    if (document.location.hash !== '#/' && !student.id) document.location.replace('/')
  }, [student])

  const pages = ({ location }) => {
    return (
      <PageTransition preset="slide" transitionKey={location.pathname}>
        <Switch location={location}>
          <Route exact path="/" component={Lobby} />
          <Route exact path="/student" component={StudentSkills} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/success" component={Success} />
        </Switch>
      </PageTransition>
    )
  }

  return (
    <HashRouter>
      <Route render={pages} />
    </HashRouter>
  )
}

export default App


