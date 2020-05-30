const pool = new (require('pg').Pool)(require('../../config/pg'))
const async = require('async')

const user_auth = require('../../modules/dev/_createTable/user_auth')
const user_info = require('../../modules/dev/_createTable/user_info')
const board = require('../../modules/dev/_createTable/board')
const user_like = require('../../modules/dev/_createTable/user_like')

const tableList = [user_auth(), user_info(), board(), user_like()]
const test_tableList = [user_auth('test'), user_info('test'), board('test'), user_like('test')]

async.waterfall(
    [
      cb => {
        console.log('\n\n[START] CREATE TABLE')
        cb(null, pool)
      },
      ...tableList,
      ...test_tableList
    ],
    (err, result) => {
      if(err) console.log(`${err}`)

      console.log('[END] CREATE TABLE\n')
      pool.end()
    }
)


