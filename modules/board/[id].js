module.exports = (req, res) => {
  const { url, method, params, body } = req

  /* call async.series to use pool */
  let { series } = require('../../utils/pg')

  let querying,
      callback,
      nextProcess

  const user_token = req.session.user_token

  switch(method) {
    case 'GET':
      console.log(`[${method}] ${url}`)

      querying = (client, cb) => {
        client.query('SELECT * FROM _test_board WHERE id=$1', [params.id])
          .then(res => res.rows[0])
          .then(rows => cb(null, rows))
          .catch(err => cb(err))
      }
      callback = result => {
        if (!result[0]) res.json({ status: 200, result: 'Data Not Found' })
        else res.json({ data: result[0], status: 200, result: 'Success' })
      }

      series([querying], callback)

      break

    case 'PATCH':
      console.log(`[${method}] ${url}`)
      console.log(`body:`)
      console.log(body)

      if(!user_token) {
        return res.json({ status: 403, result: `Authorization failed` })
      }

      querying = (client, cb) => {
        client.query('SELECT * FROM _test_board WHERE id=$1', [params.id])
            .then(res => res.rows[0])
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      callback = result => {
        if(!result[0]) return res.json({ status: 200, result: 'Data Not Found' })
        if(result[0].user_token !== user_token) return res.json({ status: 403, result: `Authorization failed` })

        nextProcess()
      }

      nextProcess = () => {
        const bodyObj = [];
        let query = 'UPDATE _test_board '

        let count = 0
        if (body.title) {
          count++
          query += ` SET title=$${count} `
          bodyObj.push(body.title)
        }
        if (body.content) {
          count++
          if (bodyObj.length > 0) query += ', '
          else query += ' SET '
          query += ` content=$${count} `
          bodyObj.push(body.content)
        }

        query += `, updated=CURRENT_TIMESTAMP WHERE id=$${bodyObj.length+1} AND user_token=$${bodyObj.length+2}`
        bodyObj.push(params.id, user_token)

        console.log(query)

        querying = (client, cb) => {
          client.query(query, bodyObj)
              .then(_ => cb(null))
              .catch(err => cb(err))
        }
        callback = result => {
          // TODO: 에러처리
          res.json({ status: 200, result: 'Success' })
        }
        series([querying], callback)
      }

      break

    case 'DELETE':
      console.log(`[${method}] ${url}`)

      console.log(`req.body: ${JSON.stringify(req.body)}`)
      console.log(`url: ${url}`)
      console.log(`params: ${JSON.stringify(params)}`)

      if(!user_token) {
        return res.json({ status: 403, result: `Authorization failed` })
      }

      querying = (client, cb) => {
        client.query('SELECT * FROM _test_board WHERE id=$1', [params.id])
            .then(res => res.rows[0])
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      callback = result => {
        if(!result[0]) return res.json({ status: 200, result: 'Data Not Found' })
        if(result[0].user_token !== user_token) return res.json({ status: 403, result: `Authorization failed` })

        nextProcess()
      }

      series([querying], callback)

      nextProcess = () => {
        querying = (client, cb) => {
          client.query('DELETE FROM _test_board WHERE id=$1', [params.id])
              .then(_ => cb(null))
              .catch(err => cb(err))
        }
        callback = result => {
          // TODO: 에러처리

          res.json({ status: 200, result: 'Success' })
        }

        series([querying], callback)
      }

      break

    default:
      console.log(`[${method}] ${url}`)
      break
  }
}
