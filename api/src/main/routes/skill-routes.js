const { adapt } = require('../adapters/router-adapter')
const ListSkillRouterComposer = require('../composers/list-skill-router-composer')

module.exports = router => {
  router.get('/student/:student_id/skills', adapt(ListSkillRouterComposer.compose()))
}
