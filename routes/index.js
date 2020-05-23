module.exports = express => {

  const router = express.Router()

  router.get('/', (req, res) => res.json({ data: 'this is index' }))

  router.use('/test/board', require('../test/board')(express))

  return router
}
