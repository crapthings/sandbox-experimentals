import React, { Component } from 'react'
import { render } from 'react-dom'

import {
  CordovaEventList,
} from '../components/calendar'

export default () => {
  return (
    <div>
      <h3>Event List</h3>
      <CordovaEventList>
        {props => {
          const { data: events } = props
          return (
            <ul>
              {events.map((item, idx) => <li key={idx}>
                {item.title}
              </li>)}
            </ul>
          )
        }}
      </CordovaEventList>
    </div>
  )
}
