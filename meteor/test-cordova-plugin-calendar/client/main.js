import React, { Component } from 'react'
import { render } from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import { CalendarList, CalendarEventList, EventList } from './cals'

const Home = () => {
  return (
    <div>
      <button onClick={() => {
        if (window && window.plugins && !window.plugins.calendar) return
        const calendarName = prompt('calendar name')
        if (calendarName) {
          window.plugins.calendar.createCalendar(calendarName)
          window.location.reload()
        }
      }}>create calendar</button>
      <button onClick={() => window.plugins.calendar.createEventInteractively(null,null,null,new Date(),new Date(),s => alert(s),error => alert(error))}>create event</button>
      <CalendarList />
      <EventList />
    </div>
  )
}

const App = () => <Router>
  <div>
    <ul>
      <li>
        <Link to='/'>home</Link>
      </li>
      <li>
        <button onClick={() => window.location.reload()}>reload</button>
      </li>
    </ul>
    <Route exact path='/' component={Home} />
    <Route exact path='/cals/:name' component={CalendarEventList} />
  </div>
</Router>

Meteor.startup(function () {
  const div = document.createElement('div')
  document.body.appendChild(div)
  render(<App />, div)
})
