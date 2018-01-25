import React, { Component } from 'react'
import { render } from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import {
  CordovaCalendarList,
  CordovaEventList,
} from '../components/calendar'

export default class CalendarList extends Component {
  render() {
    return (
      <div>
        <h3>Calendar List</h3>
        <CordovaCalendarList>
          {props => {
            const { calendar, data: list } = props
            return (
              <div>
                <ul>
                  {list.map((item, idx) => {
                    return (
                      <CalendarItem key={idx} item={item} />
                    )
                  })}
                </ul>
              </div>
            )
          }}
        </CordovaCalendarList>
      </div>
    )
  }
}

class CalendarItem extends Component {
  render() {
    const { item: { id, name, title } } = this.props
    return (
      <li key={id}>
        <Link to={`/cals/${name}`}>{name || title}</Link>
      </li>
    )
  }
}
