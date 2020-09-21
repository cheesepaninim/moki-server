module.exports = (req, res) => {
  const { params, url, method } = req

  const user_token = 'test'// TODO: 임시 user_token
  // const { user_token } = req.session

  // TODO: 서버에서 만들어야 할 듯..
  const { id } = req.body

  let content,
      img,
      querying,
      query,
      reqData,
      callback

  /* call async.series to use pool */
  const { series } = require('../utils/pg')

  switch(method) {
    case 'GET':
      console.log(`[${method}] ${url}`)
      break

    case 'POST':
      console.log(`[${method}] ${url}`)

      // TODO: title 필요 (db 설계서도 변경 필요)

      content = req.body.content ? req.body.content : ''
      img = req.body.img ? req.body.img : {}

      if (!id) {
        return res.json({ status: 400, result: `Insufficient data - id: ${id}` })
      }
      else {
        if (typeof id !== 'string') {
          return res.json({ status: 400, result: `Invalid data type - \n id: [${typeof id}] should be string` })
        } else if (typeof content !== 'string') {
          return res.json({ status: 400, result: `Invalid data type - \n content: [${typeof content}] should be string` })
        } else if (typeof img !== 'object') {
          return res.json({ status: 400, result: `Invalid data type - \n img: [${typeof img}] should be object` })
        }
      }

      if (Object.keys(img).length !== 0 && i) {
        Object.keys(img).forEach(val => {
          if (typeof img[val] !== 'object') {
            return res.json({ status: 400, result: `Invalid data type - \n img.${val}: [${typeof img[val]}] should be object` })
          }
        })
      }

      querying = (client, cb) => {
        client.query(
            'INSERT INTO _test_board(id, user_token, content, img, like_cnt, link_cnt) VALUES($1, $2, $3, $4, 0, 0)',
            [id, user_token, content, img]
        )
            .then(res => console.log(`INSERT INTO TABLE[_test_board] : ${id} `))
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      callback = result => res.json({ status: 200, result: 'Success' })

      series([querying], callback)

      break

    // case 'PATCH':
    //   console.log(`[${method}] ${url}`)
    //
    //   content = req.body.content ? req.body.content : ''
    //   // img = req.body.img ? req.body.img : {}
    //
    //   if (!id) {
    //     return res.json({ status: 400, result: `Insufficient data - id: ${id}` })
    //   }
    //   else {
    //     if (typeof id !== 'string') {
    //       return res.json({ status: 400, result: `Invalid data type - \n id: [${typeof id}] should be string` })
    //     } else if (typeof content !== 'string') {
    //       return res.json({ status: 400, result: `Invalid data type - \n content: [${typeof content}] should be string` })
    //     } else if (typeof img !== 'object') {
    //       return res.json({ status: 400, result: `Invalid data type - \n img: [${typeof img}] should be object` })
    //     }
    //   }
    //
    //   // if (Object.keys(img).length !== 0 && i) {
    //   //   Object.keys(img).forEach(val => {
    //   //     if (typeof img[val] !== 'object') {
    //   //       return res.json({ status: 400, result: `Invalid data type - \n img.${val}: [${typeof img[val]}] should be object` })
    //   //     }
    //   //   })
    //   // }
    //
    //   // TODO: user_token 검증 필요
    //
    //   /* q */
    //   /* // q */
    //
    //   querying = (client, cb) => {
    //     client.query('UPDATE _test_board SET content=$1 WHERE id=$2', [content, id])
    //         .then(res => console.log(`UPDATE TABLE[_test_board] : ${id} `))
    //         .then(rows => cb(null, rows))
    //         .catch(err => cb(err))
    //   }
    //   callback = result => res.json({ status: 200, result: 'Success' })
    //
    //   series([querying], callback)
    //
    //   break

    default:
      console.log(`[${method}] ${url}`)
      res.json({ status: 405, result: 'Method Not Allowed' })
      break
  }
}
