const moment = require('moment')

module.exports = (req, res) => {
  const { url, method, params, body } = req

  /* call async.series to use pool */
  let { series } = require('../../utils/pg')

  let querying,
      callback

  if(method !== 'GET') return res.json({ status: 405, message: 'Method not allowed' })

  const action = url.split('/')[1]
  switch(action) {
    case 'signin': {
      console.log(`[${method}] ${url}`)

      querying = (client, cb) => {
        client.query('SELECT * FROM _test_user_auth WHERE token=$1', [params.token])
            .then(res => res.rows[0])
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      callback = result => {
        if (!result[0]) res.json({ status: 200, result: 'User Not Found' })

        else {

          nextProcess()

          req.session.userToken = result[0].token
          res.json({ status: 200, result: 'Success' })
        }
      }

      series([querying], callback)

      const nextProcess = () => {

        const querying = (client, cb) => {
          client.query('INSERT INTO _test_user_access_log (userToken) VALUES($1)', [params.token])
              .then(rows => cb(null, rows))
              .catch(err => cb(err))
        }

        const callback = result => console.log(`USER[${params.token}] LOGINED.. ${moment().format('YYYY-MM-DD HH:mm:sss')}`)

        series([querying], callback)

      }

      break
    }

    case 'signout': {
      delete req.session.userToken
      return res.json({ status: 200, result: 'Success' })
    }
  }



}
