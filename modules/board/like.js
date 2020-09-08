module.exports = (req, res) => {
  const { url, method, params, body } = req

  switch(method) {
    case 'POST':
      console.log(`[${method}] ${url}`)

      const user_token = 'test' // TODO: 임시 user_token
      // const { user_token } = req.session
      const id = params.id
      const liked = body.liked === '0' ? true : false

      /* call async.series to use pool */
      const { series } = require('../../utils/pg')

      const updateQuery = 'UPDATE _test_user_like SET liked=$1 WHERE user_token=$2 AND board_id=$3'
      const updateQuerying = (client, cb) => {
        client.query(updateQuery, [liked, user_token, id])
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      const insertQuery = 'INSERT INTO _test_user_like (user_token, board_id, liked) SELECT $1, $2, true'
          + ' WHERE NOT EXISTS SELECT 1 FROM _test_user_like WHERE user_token=$1 AND board_id=$2'
      const insertQuerying = (client, cb) => {
        client.query(insertQuery, [user_token, id]
        )
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      const callback = result => res.json({ status: 200, result: 'Success' })

      series([updateQuerying, insertQuerying], callback)

      break

    default:
      console.log(`[${method}] ${url}`)
      res.json({ status: 405, result: 'Method Not Allowed' })
      break
  }
}
