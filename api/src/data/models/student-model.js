const ArrayHelper = require('../../utils/helpers/array-helper')

const students = [
  {
    id: 1,
    name: "Tester",
    email: "test@soraschools.com",
    house: "Heqet",
    skills: [
      { id: 3, level: 2 },
      { id: 4, level: 3 },
      { id: 6, level: 1 },
    ],
  },
  {
    id: 2,
    name: "Ludwig Wittgenstein",
    email: "inaflyjar@soraschools.com",
    house: "Heqet",
    skills: [
      { id: 3, level: 4 },
      { id: 4, level: 1 },
    ],
  },
  {
    id: 3,
    name: "Max Stirner",
    email: "nothingtome@soraschools.com",
    house: "Heqet",
    skills: [
      { id: 1, level: 2 },
      { id: 3, level: 3 },
      { id: 6, level: 3 },
    ],
  },
  {
    id: 4,
    name: "Simone de Beauvoir",
    email: "strongnproud@soraschools.com",
    house: "Nightshade",
    skills: [
      { id: 4, level: 3 },
      { id: 5, level: 3 },
      { id: 6, level: 4 },
    ],
  },
  {
    id: 2,
    name: "Friedrich Nietzsche",
    email: "iamtheubermench@soraschools.com",
    house: "Nightshade",
    skills: [
      { id: 3, level: 4 },
      { id: 4, level: 3 },
      { id: 4, level: 1 },
      { id: 6, level: 1 },
    ],
  },
]

module.exports = {
  getBy: function (filter = {}) {
    return ArrayHelper.filterBy(students, filter)
  }
}