module.exports = async (req, res) => {
  const { url, method, params, body } = req

  // TODO: 함수명 변경
  
  switch(method) {
    case 'POST':
      console.log(`[${method}] ${url}`)

      const user_token = 'test' // TODO: 임시 user_token
      // const { user_token } = req.session
      const id = params.id
      const liked = body.liked === '1' ? true : false

      /* call async.series to use pool */
      const { series } = require('../../utils/pg')

      /* TODO::: 기존과 같은 경우에는 실행 X */
      const querying0 = (client, cb) => {
        client.query(
          'SELECT liked FROM _test_user_like WHERE user_token=$1 AND board_id=$2',
          [user_token, id]
        )
          .then(res => {
            console.log(`SELECT liked FROM _test_user_like WHERE user_token=${user_token} AND board_id=${id}`)
            return res.rows[0]
          })
          .then(rows => cb(null, rows))
          .catch(err => cb(err))
      }

      const callback0 = result => {
        console.log(`result: ${result[0].liked}`)
        console.log(`liked: ${liked}`)
        if (result[0].liked === liked) {
          // TODO: 잘못된 요청..? (기존과 같음)
          return res.json({ status: 200, result: 'Nothing Updated..' })
        }
        else {
          // 
          nextProcess()
        }
      }

      series([querying0], callback0)

      const nextProcess = () => {

        const querying1 = (client, cb) => {
          client.query(
            'INSERT INTO _test_user_like (user_token, board_id, liked) VALUES($1, $2, $3) ON CONFLICT (user_token, board_id) DO UPDATE SET liked=$3',
            [user_token, id, liked]
          )
            .then(res => console.log(`UPDATE TABLE[_test_board_like] : user_token=${user_token} AND board_id=${id} `))
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
        }

        const query = `UPDATE _test_board SET like_cnt=like_cnt${liked ? ' + ' : ' - '}1 WHERE id=$1`
        const querying2 = (client, cb) => {
          client.query(query, [id])
            .then(res => console.log(query))
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
        }

        const callback = result => res.json({ status: 200, result: 'Success' })
        series([querying1, querying2], callback)

      }

      break

    default:
      console.log(`[${method}] ${url}`)
      res.json({ status: 405, result: 'Method Not Allowed' })
      break
  }
}
