const shortid = require('shortid')

module.exports = (req, res) => {
  const { params, url, method } = req

  const user_token = req.session.user_token
  // const { user_token } = req.session

  const id  = shortid.generate()  // board_id

  let title,
      content,
      querying,
      query,
      reqData,
      callback

  /* call async.series to use pool */
  const { series } = require('../utils/pg')

  switch(method) {

    case 'POST':
      console.log(`[${method}] ${url}`)

      // TODO: title 필요 (db 설계서도 변경 필요)

      const user_token = req.body.user_token

      if(!user_token) {
        return res.json({ status: 403, result: `Authorization failed` })
      }

      if(typeof user_token !== 'string') {
        return res.json({ status: 400, result: `Invalid data type - \n content: [${typeof user_token}] should be string` })
      }

      querying = (client, cb) => {
        client.query(
            'INSERT INTO _test_user_auth(token) VALUES($1)',
            [user_token]
        )
            .then(res => console.log(`INSERT INTO TABLE[_test_user_auth] : ${user_token} `))
            .then(rows => cb(null, rows))
            .catch(err => {
              if(err.code = '23505') return res.json({ status: 200, result: `Already Exist user_token: ${user_token}` })
              else cb(err)
            })
      }
      callback = result => res.json({
        status: 200,
        result: 'Success',
        message: `[${user_token}] created`,
        user_token: user_token
      })

      series([querying], callback)

      break



    default:
      console.log(`[${method}] ${url}`)
      res.json({ status: 405, result: 'Method Not Allowed' })
      break
  }
}
