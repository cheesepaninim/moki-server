const shortid = require('shortid')

module.exports = (req, res) => {
  const { query, url, method } = req

  const userToken = req.session.userToken
  // const { userToken } = req.session

  const id  = shortid.generate()  // boardId

  let title,
      content,
      querying,
      reqData,
      callback

  /* call async.series to use pool */
  const { series } = require('../utils/pg')

  switch(method) {
    case 'GET':
      console.log(`[${method}] ${url}`)

      // TODO:::::::::::::: 예외 처리
      const search = query.search === '01' ? 'likeCnt' : query.search === '02' ? 'linkCnt' : 'created'
      if(isNaN(Number(query.size))) query.size = '10'
      const size = query.size || '10'

      // TODO:::::::::::::::::::::::::::::::::::::::::::::: 사용자 게시글 조회

      let selectQuery = 'SELECT A.*, B.image userImage FROM _test_board A'
                      + ' LEFT JOIN _test_userInfo B ON A.userToken=B.userToken'

      const params = []
      if(query.token) {
        selectQuery += ' WHERE A.userToken=$1'
        params.push(query.token)
      }

      if(search) {
        selectQuery += ` ORDER BY ${search} DESC`
      }

      selectQuery += ` LIMIT $${params.length+1}`
      params.push(size)

      console.log(selectQuery)
      console.log(params)

      querying = (client, cb) => {
        client.query(selectQuery, params)
            .then(res => res.rows)
            .then(rows => cb(null, rows))
            .catch(err => cb(err))
      }
      callback = result => {
        if (!result[0]) res.json({ status: 200, result: 'Data Not Found' })
        else {
          // console.log(result[0].rows.forEach)
          res.json({ data: result[0], total: result[0].length, status: 200, result: 'Success' })
        }
      }

      series([querying], callback)

      break

    case 'POST':
      console.log(`[${method}] ${url}`)

      // TODO: title 필요 (db 설계서도 변경 필요)

      if(!userToken) {
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
            'INSERT INTO _test_board(id, userToken, title, content, likeCnt, linkCnt) VALUES($1, $2, $3, $4, 0, 0)',
            [id, userToken, title, content]
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
