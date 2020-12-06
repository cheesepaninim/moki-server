module.exports = async (req, res) => {
  const { url, method, params, body } = req

  // TODO: 함수명 변경

  switch(method) {
    case 'POST':
      console.log(`[${method}] ${url}`)

      const userToken = 'test' // TODO: 임시 userToken
      // const { userToken } = req.session
      const id = params.id
      const liked = body.liked === '1' ? true : false

      /* call async.series to use pool */
      const { series } = require('../../utils/pg')

      /* TODO::: 기존과 같은 경우에는 실행 X */
      const querying0 = (client, cb) => {
        client.query(
          'SELECT liked FROM _test_user_like WHERE userToken=$1 AND boardId=$2',
          [userToken, id]
        )
          .then(res => {
            console.log(`SELECT liked FROM _test_user_like WHERE userToken=${userToken} AND boardId=${id}`)
            return res.rows[0]
          })
          .then(rows =>
              {console.log(rows);
              cb(null, rows)}
          )
          .catch(err => {
            console.log(err)
            // cb() 하면 callback was already callled 나옴..
            // TODO: 에러처리 필요
          })
      }

      const callback0 = result => {
        console.log(`result: ${result}`)
        if(!result || !result[0] || result[0].liked !== liked) {
          //
          nextProcess()
        }
        else {
          // TODO: 잘못된 요청..? (기존과 같음)
          return res.json({ status: 200, result: 'Nothing Updated..' })
        }
      }

      series([querying0], callback0)

      const nextProcess = () => {

        const querying1 = (client, cb) => {
          client.query(
            'INSERT INTO _test_user_like (userToken, boardId, liked) VALUES($1, $2, $3) ON CONFLICT (userToken, boardId) DO UPDATE SET liked=$3',
            [userToken, id, liked]
          )
            .then(res => console.log(`UPDATE TABLE[_test_board_like] : userToken=${userToken} AND boardId=${id} `))
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
        }

        const query = `UPDATE _test_board SET likeCnt=likeCnt${liked ? ' + ' : ' - '}1 WHERE id=$1`
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
