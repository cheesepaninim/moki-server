/*
*  테이블 생성 코드
*  ..\moki-server\utils\dev> node _createTable.js
*/

const pool = new (require('pg').Pool)(require('../../_config/pg'))
const async = require('async')

const userAuth = require('../../modules/dev/_createTable/userAuth')
const userAccessLog = require('../../modules/dev/_createTable/userAccessLog')
const userInfo = require('../../modules/dev/_createTable/userInfo')
const board = require('../../modules/dev/_createTable/board')
const userLike = require('../../modules/dev/_createTable/userLike')

const tableList = [userAuth(), userAccessLog(), userInfo(), board(), userLike()]
const testTableList = [userAuth('test'), userAccessLog('test'), userInfo('test'), board('test'), userLike('test')]

async.waterfall(
    [
      cb => {
        console.log('\n\n[START] CREATE TABLE')
        cb(null, pool)
      },
      ...tableList,
      ...testTableList
    ],
    (err, result) => {
      if(err) console.log(`${err}`)

      console.log('[END] CREATE TABLE\n')
      pool.end()
    }
)


