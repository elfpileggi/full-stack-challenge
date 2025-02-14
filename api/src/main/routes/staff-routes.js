const { adapt } = require('../adapters/router-adapter')
const GetStaffRouterComposer = require('../composers/get-staff-router-composer')
const FindBestStaffRouterComposer = require('../composers/find-best-staff-router-composer')

module.exports = router => {
  router.get('/staff/:type/:id', adapt(GetStaffRouterComposer.compose()))
  router.get('/staff/best/:skill_id/:level/student/:student_id', adapt(FindBestStaffRouterComposer.compose()))
}
