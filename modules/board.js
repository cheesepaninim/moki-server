const shortid = require('shortid')

module.exports = (req, res) => {
  const { params, url, method } = req

  const user_token = req.session.user_token
  // const { user_token } = req.session

  const id  = shortid.generate()  // board_id

  let title,
      content,
      querying,
      query,
      reqData,
      callback

  /* call async.series to use pool */
  const { series } = require('../utils/pg')

  switch(method) {
    case 'GET':
      console.log(`[${method}] ${url}`)

      // TODO: 임시 전체 조회

      querying = (client, cb) => {
        client.query('SELECT * FROM _test_board')
            .then(res => res.rows)
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      callback = result => {
        if (!result[0]) res.json({ status: 200, result: 'Data Not Found' })
        else res.json({ data: result[0], total: result[0].length, status: 200, result: 'Success' })
      }

      series([querying], callback)

      break

    case 'POST':
      console.log(`[${method}] ${url}`)

      // TODO: title 필요 (db 설계서도 변경 필요)

      if(!user_token) {
        return res.json({ status: 403, result: `Authorization failed` })
      }

      title = req.body.title ? req.body.title : ''
      content = req.body.content ? req.body.content : ''

      if(typeof title !== 'string') {
        return res.json({ status: 400, result: `Invalid data type - \n content: [${typeof content}] should be string` })
      } else if (typeof content !== 'string') {
        return res.json({status: 400, result: `Invalid data type - \n content: [${typeof content}] should be string`})
      }

      querying = (client, cb) => {
        client.query(
            'INSERT INTO _test_board(id, user_token, title, content, like_cnt, link_cnt) VALUES($1, $2, $3, $4, 0, 0)',
            [id, user_token, title, content]
        )
            .then(res => console.log(`INSERT INTO TABLE[_test_board] : ${id} `))
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      callback = result => res.json({
        status: 200,
        result: 'Success',
        message: `[${id}] created`,
        boardId: id
      })

      series([querying], callback)

      break



    default:
      console.log(`[${method}] ${url}`)
      res.json({ status: 405, result: 'Method Not Allowed' })
      break
  }
}
