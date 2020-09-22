module.exports = (req, res) => {
  const { url, method, params, body } = req

  /* call async.series to use pool */
  let { series } = require('../../utils/pg')

  let querying,
      callback

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

      const bodyObj = [];
      let query = 'UPDATE _test_board '
      if (body.content) {
        query += ' SET content=$1 '
        bodyObj.push(body.content)
      }

      query += `, updated=CURRENT_TIMESTAMP WHERE id=$${bodyObj.length+1}`
      bodyObj.push(params.id)

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

      break

    case 'DELETE':
      console.log(`[${method}] ${url}`)

      console.log(`req.body: ${JSON.stringify(req.body)}`)
      console.log(`url: ${url}`)
      console.log(`params: ${JSON.stringify(params)}`)

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

      break

    default:
      console.log(`[${method}] ${url}`)
      break
  }
}
