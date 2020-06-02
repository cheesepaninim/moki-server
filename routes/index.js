module.exports = express => {
  const router = express.Router()

  // pass express
  // router.use('/test/board', require('../test/board')(express))
  // pass req, res
  // router.use('/test/board', (req, res) => require('../test/board')(req, res))

  /*  */
  router.get('/', (req, res) => res.json({ data: 'this is index' }))



  // 게시글 조회
  router.get('/board', (req, res) => require('../modules/board/getBoard.js')(req, res))
  // 게시글 등록
  router.post('board', (req, res) => require('../modules/board/createBoard.js')(req, res))
  // 게시글 수정
  router.patch('/board', (req, res) => require('../modules/board/updateBoard.js')(req, res))
  // 게시글 삭제
  router.delete('/board', (req, res) => require('../modules/board/deleteBoard.js')(req, res))
  // 게시글 좋아요 / 취소
  router.get('/board/like', (req, res) => require('../modules/board/like/index.js')(req, res))



  return router
}
