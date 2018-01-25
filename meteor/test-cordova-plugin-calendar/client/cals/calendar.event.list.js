const React = require('react')
const { Component } = React

import {
  CordovaCalendarList,
  CordovaEventList,
} from '../components/calendar'

export default ({ match }) => {
  const { name } = match.params
  return (
    <div>
      <h3>Event List</h3>
      <CordovaEventList name={name}>
        {props => {
          const { data: events } = props
          return (
            <ul>
              {events.map((item, idx) => {
                return (
                  <li key={idx}>
                    {item.title || item.name}
                  </li>
                )
              })}
            </ul>
          )
        }}
      </CordovaEventList>
    </div>
  )
}
