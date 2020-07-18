module.exports = (req, res) => {
  const { params, url, method } = req

  switch(method) {
    case 'GET':
      console.log(`[${method}] ${url}`)

      /* call async.series to use pool */
      const { series } = require('../../utils/pg')

      const querying = (client, cb) => {
        client.query('SELECT * FROM _test_board WHERE id=$1', [params.id])
          .then(res => res.rows[0])
          .then(rows => cb(null, rows))
          .catch(err => cb(err))
      }
      const callback = result => {
        if (!result[0]) res.json({ status: 200, result: 'Data Not Found' })
        else res.json({ data: result[0], status: 200, result: 'Success' })
      }

      series([querying], callback)

      break

    case 'PATCH':
      console.log(`[${method}] ${url}`)
      break

    case 'DELETE':
      console.log(`[${method}] ${url}`)
      break

    default:
      console.log(`[${method}] ${url}`)
      break
  }
}
