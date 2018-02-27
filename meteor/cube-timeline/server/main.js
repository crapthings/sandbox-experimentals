import ACTIVITIES_TABLE from '/lib/activities-table'
const ACTIVITIES_TABLE_TEST = _.pickBy(ACTIVITIES_TABLE, ({ emphasis }) => emphasis >= 5)
const ACTIVITIES_TABLE_TEST_KEYS = _.keys(ACTIVITIES_TABLE_TEST)

Meteor.methods({
  timeline() {
    // const groupIds = Groups.find({ isDeleted: { $ne: true } }).map(({ _id }) => _id )
    const users = Users.find({ role: 'lawyer', 'profile.avatar': /http/ }).fetch()
    const usersKeyById = _.keyBy(users, '_id')
    const issues = Issues.find().fetch()
    const issuesKeyById = _.keyBy(issues, '_id')
    // const activitiesSelector = { type: { $in: TYPES }, groupId: { $in: groupIds } }
    // const activitiesSelector = { groupId: { $in: groupIds }, createdAt: { $exists: true } }
    const activitiesSelector = { issueId: { $in: _.keys(issuesKeyById) }, initiatorId: { $in: _.keys(usersKeyById) }, $or: [{ type: /:/ }, { type: { $in: ACTIVITIES_TABLE_TEST_KEYS } }] }
    const activitiesOptions = { sort: { createdAt: -1 }, limit: 1000 }
    const activitiesFindArgs = [activitiesSelector, activitiesOptions]
    let activities = Activities.find(...activitiesFindArgs, ).map(activity => {
      const avatarUrl = _.get(usersKeyById, `${activity.initiatorId}.profile.avatar`)
      return {
        id: activity._id,
        content: `<div>
          <img style="vertical-align: middle; width: 40px; height: 40px;" src="${avatarUrl}" alt=""/>
          ${issuesKeyById[activity.issueId].title}
        </div>`,
        avatarUrl: _.get(usersKeyById, `${activity.initiatorId}.profile.avatar`),
        // start: moment(activity.createdAt).format('YYYY-MM-DD'),
        start: activity.createdAt,
      }
    })

    console.log(activities)

    // activities = _.chain(activities)
    //   .groupBy('groupDateAsYYYYMM')
    //   .map((v, k) => {
    //     console.log(v)
    //     return {
    //       start: k,
    //       content: `${_.size(v)}`,
    //     }
    //   })
    //   .value()

    console.log(activities.length)
    return {
      options: {
        // start: moment().subtract(3, 'years').toDate(),
        // end: new Date(),
      },
      data: activities,
    }
  }
})
