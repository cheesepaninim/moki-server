module.exports = (req, res) => {
  const { url, method } = req

  const { userToken } = req.body

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
      // console.log(req.session.userToken, userToken)

      if(!userToken) {
        return res.json({ status: 405, result: `Missing Params: [userToken (string)] ` })
      }

      if(req.session.userToken !== userToken) {
        return res.json({ status: 403, result: `Authorization failed ` })
      }

      return res.json({ status: 200, result: `Success` })

      break

    case 'signup':
      console.log(`[${method}] ${url}`)

      if(!userToken) {
        return res.json({ status: 405, result: `Missing Params: [userToken (string)] ` })
      }

      if(typeof userToken !== 'string') {
        return res.json({ status: 400, result: `Invalid data type - \n content: [${typeof userToken}] should be string` })
      }

      querying = (client, cb) => {
        client.query(
            'INSERT INTO _test_user_auth(token) VALUES($1)',
            [userToken]
        )
            .then(res => console.log(`INSERT INTO TABLE[_test_user_auth] : ${userToken} `))
            .then(rows => cb(null, rows))
            .catch(err => {
              if(err.code = '23505') return res.json({ status: 200, result: `Already Exist userToken: ${userToken}` })
              else cb(err)
            })
      }
      callback = result => res.json({
        status: 200,
        result: 'Success',
        message: `[${userToken}] created`,
        userToken: userToken
      })

      series([querying], callback)

      break

  }
}
