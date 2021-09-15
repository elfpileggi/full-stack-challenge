const ArrayHelper = require('../../utils/helpers/array-helper')

const skills = [
  {
    id: 1,
    title: 'Algebra Skill',
    subject_id: 1
  },
  {
    id: 2,
    title: 'Geometry skill',
    subject_id: 1
  },
  {
    id: 3,
    title: 'Biology Skill',
    subject_id: 2
  },
  {
    id: 4,
    title: 'Physics Skill',
    subject_id: 2
  },
  {
    id: 5,
    title: 'Philosophy Skill',
    subject_id: 3
  },
  {
    id: 6,
    title: 'American History Skill',
    subject_id: 4
  }
]

module.exports = {
  getBy: function (filter = {}) {
    return ArrayHelper.filterBy(skills, filter)
  }
}
