module.exports = (req, res) => {
  const { params, url, method } = req

  switch(method) {
    case 'GET':
      console.log(`[${method}] ${url}`)
      break

    case 'POST':
      console.log(`[${method}] ${url}`)

      const user_token = 'test' // TODO: 임시 user_token
      // const { user_token } = req.session
      const { id } = req.body
      const content = req.body.content ? req.body.content : ''
      const img = req.body.img ? req.body.img : {}

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

      /* call async.series to use pool */
      const { series } = require('../utils/pg')

      const querying = (client, cb) => {
        client.query(
            'INSERT INTO _test_board(id, user_token, content, img, like_cnt, link_cnt) VALUES($1, $2, $3, $4, 0, 0)',
            [id, user_token, content, img]
        )
            .then(res => console.log(`INSERT INTO TABLE[_test_board] : ${id} `))
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      const callback = result => res.json({ status: 200, result: 'Success' })

      series([querying], callback)

      break

    default:
      console.log(`[${method}] ${url}`)
      res.json({ status: 405, result: 'Method Not Allowed' })
      break
  }
}
