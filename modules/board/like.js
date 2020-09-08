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

      const querying = (client, cb) => {
        client.query(
          'INSERT INTO _test_user_like (user_token, board_id, liked) VALUES($1, $2, $3) ON CONFLICT (user_token, board_id) DO UPDATE SET liked=$3',
          [user_token, id, liked]
        )
          .then(res => console.log(`UPDATE TABLE[_test_board_like] : user_token=${user_token} AND board_id=${id} `))
          .then(rows => cb(null, rows))
          .catch(err => cb(err))
      }

      // TODO: board like_cnt 증감

      const callback = result => res.json({ status: 200, result: 'Success' })
      series([querying], callback)

      break

    default:
      console.log(`[${method}] ${url}`)
      res.json({ status: 405, result: 'Method Not Allowed' })
      break
  }
}
