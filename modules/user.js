module.exports = (req, res) => {
  const { url, method } = req

  const { user_token } = req.body

  let querying,
      callback

  /* call async.series to use pool */
  const { series } = require('../utils/pg')

  if(method !== 'POST') {
    return res.json({ status: 405, result: 'Method Not Allowed' })
  }

  const action = url.split('/')[1]
  switch(action) {
    case '':
      console.log(`[${method}] ${url}`)
      // console.log(req.session.user_token, user_token)

      if(!user_token) {
        return res.json({ status: 405, result: `Missing Params: [user_token (string)] ` })
      }

      if(req.session.user_token !== user_token) {
        return res.json({ status: 403, result: `Authorization failed ` })
      }

      return res.json({ status: 200, result: `Success` })

      break

    case 'signup':
      console.log(`[${method}] ${url}`)

      if(!user_token) {
        return res.json({ status: 405, result: `Missing Params: [user_token (string)] ` })
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

  }
}
