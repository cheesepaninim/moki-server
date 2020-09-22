const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerOpt = require('../config/swagger')
const specs = swaggerJsdoc(swaggerOpt)

module.exports = express => {
  const router = express.Router()

  // pass express
  // router.use('/test/board', require('../test/board')(express))
  // pass req, res
  // router.use('/test/board', (req, res) => require('../test/board')(req, res))

  /*  */
  router.get('/', (req, res) => res.json({ data: 'index' }))



  // swagger-ui (https://github.com/swagger-api/swagger-ui/blob/HEAD/docs/usage/configuration.md)
  // swagger-jsdoc (https://www.npmjs.com/package/swagger-jsdoc)
  // https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563
  router.use('/api-docs', swaggerUi.serve)
  router.get('/api-docs', swaggerUi.setup(specs, { explorer: true }))



  // 게시글 등록 (O)
  router.post('/board', (req, res) => require('../modules/board.js')(req, res))
  // 게시글 조회 (O)
  router.get('/board/:id', (req, res) => require('../modules/board/[id].js')(req, res))
  // 게시글 수정 (O)
  router.patch('/board/:id', (req, res) => require('../modules/board/[id].js')(req, res))
  // 게시글 삭제 (O)
  router.delete('/board/:id', (req, res) => require('../modules/board/[id].js')(req, res))
  // 게시글 좋아요 / 취소 (O)
  router.post('/board/:id/like', (req, res) => require('../modules/board/like.js')(req, res))



  return router
}
