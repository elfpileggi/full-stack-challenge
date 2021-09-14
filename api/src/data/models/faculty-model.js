const ArrayHelper = require('../../utils/helpers/array-helper')

const faculties = [
  {
    id: 1,
    name: 'Michael Granado',
    subject_ids: [3, 4]
  },
  {
    id: 2,
    name: 'Carolyn Reeves',
    subject_ids: [1, 2]
  }
]

module.exports = {
  getBy: function (filter = {}) {
    return ArrayHelper.filterBy(faculties, filter)
  }
}
