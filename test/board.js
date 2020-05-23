const pool = new (require('pg').Pool)(require('../opt'))
const async = require('async')

// tmp
let num = 0

module.exports = express => {
  const router = express.Router()

  // select
  router.get('/', (req, res) => {
    pool.query(`SELECT * FROM _test_board WHERE id=$1`, ['test_01']
        , function(err, result){
          // if(err) console.log(err)

          res.json({ data: result.rows[0] })
        }
    )
  })

  router.post('/', (req, res) => {
    const user_token = 'test'

    ++num
    const id = 'tmp' + num

    const content = req.body.content

    pool.query(`INSERT INTO _test_board(user_token, id, content) VALUES($1, $2, $3)`, [user_token, id, content])

    res.json({ data: 'post success' })
  })

  return router
}
