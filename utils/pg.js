/*
 * Usage.
 * 1. client
 *  -> single query
 * 2. series
 *  -> multiple query
 */

const async = require('async')
const { Pool, Client } = require('pg')
const option = require('../config/pg')

const client = new Client(option)
const pool = new Pool(option)

// may use sentry.io
// https://docs.sentry.io/platforms/node/
const log = () => {}
const errHandler = err => console.trace(err.stack)



/* client.query */
exports.client = async () => {
  await client.connect()
  await client.query('SELECT NOW()')
      .then(res => console.log(res))
      .catch(err => errHandler(err))
  await client.end()
}



/* pool.query */
exports.series = async fns => {
  const client = await pool.connect()

  fns = fns.map(fn => cb => fn(client, cb))

  await async.series([...fns], (err, res) => {
    if(err) errHandler(err)

    client.release()
    console.log(res)
  })
}
