/*
*  테이블 생성 코드
*  ..\moki-server\utils\dev> node _createTable.js
*/

const env = 'dev'
// const env = 'prod'

;(env => {
  console.log(`___________________________________${env}`)
  env = env === 'dev' ? 'test' : ''

  const pool = new (require('pg').Pool)(require('../../_config/pg'))
  const async = require('async')

  const userAuth = require('../../modules/dev/_createTable/userAuth')
  const userAccessLog = require('../../modules/dev/_createTable/userAccessLog')
  const userInfo = require('../../modules/dev/_createTable/userInfo')
  const board = require('../../modules/dev/_createTable/board')
  const userLike = require('../../modules/dev/_createTable/userLike')


  const tableList = [
    userAuth.create(env), /*userAuth.alter(env),*/
    userAccessLog.create(env), /*userAccessLog.create(),*/
    // userInfo.create(), userInfo.create(),
    // board.create(), board.create(),
    // userLike.create(), board.alter(),
  ]

  async.waterfall(
      [
        cb => {
          console.log('\n\n[START] CREATE TABLE')
          cb(null, pool)
        },
        ...tableList,
      ],
      (err, result) => {
        if (err) console.log(`${err}`)

        console.log('[END] CREATE TABLE\n')
        pool.end()
      }
  )


})(env)
