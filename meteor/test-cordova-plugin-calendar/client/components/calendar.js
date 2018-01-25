const React = require('react')
const { Component } = React

class CordovaCalendarList extends Component {
  state = {
    data: [],
    error: undefined,
  }

  componentDidMount() {
    if (!isAvailable())
      return

    this.init()
    this.listCalendars()
  }

  render() {
    const { calendar, state, props } = this
    const { data, error } = state
    const { children } = props
    return children({
      isAvailable: isAvailable(),
      calendar,
      state,
      props,
      data,
      error,
    })
  }

  init = () => {
    this.calendar = window.plugins.calendar
    this.requestReadWritePermission()
  }

  listCalendars = () => {
    this.calendar.listCalendars(data => {
      this.setState({ data })
    }, error => {
      this.setState({ error })
    })
  }

  requestReadWritePermission = () => {
    const { calendar } = this
    if (device.platform !== 'Android')
      return

    calendar.hasReadWritePermission(hasPermission => {
      if (!hasPermission)
        return calendar.requestReadWritePermission()

      this.calendar.listCalendars(data => {
        this.setState({ data })
      }, error => {
        this.setState({ error })
      })
    })
  }
}

class CordovaEventList extends Component {
  state = {
    data: [],
    error: undefined,
  }

  componentDidMount() {
    if (!isAvailable())
      return

    this.init()
    this.listEvents()
  }

  render() {
    const { calendar, state, props } = this
    const { data, error } = state
    const { children } = props
    return children({
      isAvailable: isAvailable(),
      calendar,
      state,
      props,
      data,
      error,
    })
  }

  init = () => {
    this.calendar = window.plugins.calendar
  }

  listEvents = () => {
    const { findEventWithOptions } = this.calendar
    const selector = this.getSelector()
    findEventWithOptions.apply(findEventWithOptions, selector)
  }

  onListEventsSuccess = data => {
    this.setState({ data }, () => {

    })
  }

  onListEventsError = error => {
    this.setState({ error })
  }

  getSelector = () => {
    const {
      name, title, localtion, notes,
      start, end, calOptions,
      onSuccess, onError,
    } = this.props

    const date = this.getDate()

    let selector = [
      title || null,
      localtion || null,
      notes || null,
      start || date.firstDayOfMonth,
      end || date.lastDayOfMonth,
      calOptions || this.calendar.getCreateCalendarOptions(),
      onSuccess || this.onListEventsSuccess,
      onError || this.onListEventsError,
    ]

    if (device.platform === 'iOS') {
      if (name)
        selector[5].calendarName = name
    }

    return selector
  }

  getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    return {
      year,
      month,
      firstDayOfMonth,
      lastDayOfMonth,
    }
  }
}

function isAvailable() {
  return Meteor.isCordova
}

module.exports = {
  CordovaCalendarList,
  CordovaEventList,
  isAvailable,
}
