module.exports = router => {

  // 게시글 전체 조회 (O TODO: 임시)
  router.get('/', (req, res) => require('../modules/board.js')(req, res))
  // 게시글 등록 (O)
  router.post('/', (req, res) => require('../modules/board.js')(req, res))
  // 게시글 조회 (O)
  router.get('/:id', (req, res) => require('../modules/board/[id].js')(req, res))
  // 게시글 수정 (O)
  router.patch('/:id', (req, res) => require('../modules/board/[id].js')(req, res))
  // 게시글 삭제 (O)
  router.delete('/:id', (req, res) => require('../modules/board/[id].js')(req, res))
  // 게시글 좋아요 / 취소 (O)
  router.post('/:id/like', (req, res) => require('../modules/board/like.js')(req, res))

  return router
}
