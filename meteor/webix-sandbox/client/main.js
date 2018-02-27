const PIVOT = data => {
  console.log(data)
  return ({
    view: 'pivot',
    id: 'pivot',
    data,
    structure: {
      rows: ['_id'],
      columns: [],
      values: [],
      filters: []
    }
  })
}

const HEADER = { view: 'template', type: 'header', template: 'PIVOT', }

Meteor.startup(function () {
  Meteor.call('group', (e, data) => {

    webix.ui({
      rows:[
        HEADER,
        PIVOT(data),
      ]
    })

  })
})
