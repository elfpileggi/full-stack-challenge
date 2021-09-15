import React from "react"
import { HashRouter, Switch, Route } from 'react-router-dom'
import { PageTransition } from '@steveeeie/react-page-transition'

import Lobby from "../lobby/Lobby"
import StudentSkills from "../student_skills/StudentSkills"
import Chat from "../chat/Chat"

import "./App.css"

const App = (props) => {
  const pages = ({ location }) => {
    return (
      <PageTransition preset="moveToLeftFromRight" transitionKey={location.pathname}>
        <Switch location={location}>
          <Route exact path="/" component={Lobby} />
          <Route exact path="/student" component={StudentSkills} />
          <Route exact path="/chat" component={Chat} />
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


