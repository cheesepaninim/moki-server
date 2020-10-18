/*
 * Usage.
 * 1. client
 *  -> single query
 * 2. series
 *  -> multiple query
 */

const async = require('async')
const { Pool, Client } = require('pg')
const option = require('../_config/pg')

const client = new Client(option)
const pool = new Pool(option)

const status = require('../_config/statusCode')

// may use sentry.io
// https://docs.sentry.io/platforms/node/
const log = () => {}
const defaultCallback = _ => console.log('abc')
const defaultErrHandler = err => console.trace(err.stack)


/* client.query */
// exports.client = async (fn=(()=>{}), callback, fail) => {
//   await client.connect()
//   await client.query('SELECT NOW()')
//       .then(res => console.log(res))
//       .catch(err => {
//         typeof fail === 'function'
//           ? fail(err)
//           : defaultErrHandler(err)
//       })
//   await client.end()
// }


/* pool.query */
exports.series = async (fns=[], callback, fail) => {
  const client = await pool.connect()

  fns = fns.map(fn => cb => fn(client, cb))

  async.series([...fns], (err, res) => {
    if(err) {
      typeof fail === 'function'
        ? fail(err)
        : defaultErrHandler(err)
    }

    client.release()

    typeof callback === 'function'
      ? callback(res)
      : (() => {
        console.warn('warning..')
        defaultCallback(res)
      })()
  })
}
