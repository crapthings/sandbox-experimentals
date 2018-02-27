
import React, { Component } from 'react'
import { render } from 'react-dom'



var newVisDataSet = function (data) {
  return new vis.DataSet(data)
}

class TIMELINE extends Component {
  componentDidMount() {
    const $vis = this.refs.vis

    Meteor.call('timeline', (err, { data, options: { start, end } }) => {
      const now = moment(_.last(data).start).subtract(2, 'hours')
      const options = {
        // zoomMax: (315360000000000 / 10000) * 8,
        // start,
        // end,
        orientation: {
          axis: 'both',
          item: 'top',
        },
      }

      const aabb = new vis.Timeline($vis, newVisDataSet(data), options)
      Meteor.setInterval(function () {
        aabb.moveTo(now.add(30, 'seconds').toDate())
      }, 100)
    })
  }

  render() {
    return (
      <div ref='vis'></div>
    )
  }
}

Meteor.startup(function () {
  render(<div>
    <TIMELINE />
  </div>, document.getElementById('app'))
})
