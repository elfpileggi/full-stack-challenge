const { adapt } = require('../adapters/router-adapter')
const GetStudentRouterComposer = require('../composers/get-student-router-composer')
const ListStudentRouterComposer = require('../composers/list-student-router-composer')

module.exports = router => {
  router.get('/students/:id', adapt(GetStudentRouterComposer.compose()))
  router.get('/students', adapt(ListStudentRouterComposer.compose()))
}
