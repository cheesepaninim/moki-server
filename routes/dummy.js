module.exports = router => {

  router.get('/', (req, res) => res.json({ data: 'dummy!' }))

  // 한 개의 더미 게시글 생성
  router.post('/board', (req, res) => require('../modules/dummy/board')(req, res))

  // [num]개의 더미 게시글 생성
  router.post('/board/:num', (req, res) => require('../modules/dummy/board/[num]')(req, res))

  return router
}
