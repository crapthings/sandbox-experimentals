import _ from 'lodash'
import moment from 'moment'

Meteor.methods({
  group() {
    const activities = Activities.find({}, { fields: { groupId: 1, type: 1, } }).fetch()
    const activitiesGroupByGroupId = _.groupBy(activities, 'groupId')

    let groups = Groups.find({}, { fields: { createdAt: 1, name: 1, shortName: 1, type: 1, } }).fetch()

    groups = _.map(groups, group => {
      group.activitiesCount = _.size(activitiesGroupByGroupId[group._id])
      group.createdYear = moment(group.createdAt).year()
      return group
    })

    return groups
  }
})
