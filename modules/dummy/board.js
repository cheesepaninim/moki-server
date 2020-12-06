const shortid = require('shortid')
const faker = require('faker')

module.exports = (req, res) => {
  const { url, method } = req

  const id  = shortid.generate()  // boardId

  // 입력 값이 없는 경우 'test' 계정
  let userToken = req.body.userToken || 'test'

  let title,
      content,
      querying,
      callback

  /* call async.series to use pool */
  const { series } = require('../../utils/pg')

  switch(method) {
    case 'POST':
      console.log(`[DUMMY_${method}] ${url}`)

      const fake = "'{{name.title}}' by {{name.lastName}} {{name.firstName}}."
      title = req.body.title || faker.fake(fake)

      content = `${faker.lorem.lines()}\n<img src="${faker.image.imageUrl}"/><br/><br/>${faker.lorem.sentences()}<br/>${faker.lorem.sentences()}${faker.lorem.sentences()}`
      content = req.body.content || content

      const likeCnt = req.body.likeCnt || 0
      const linkCnt = req.body.linkCnt || 0

      if(typeof title !== 'string') {
        return res.json({ status: 400, result: `Invalid data type - \n content: [${typeof content}] should be string` })
      } else if (typeof content !== 'string') {
        return res.json({status: 400, result: `Invalid data type - \n content: [${typeof content}] should be string`})
      } else if (typeof likeCnt !== 'number') {
        return res.json({status: 400, result: `Invalid data type - \n content: [${typeof likeCnt}] should be number`})
      } else if (typeof linkCnt !== 'number') {
        return res.json({status: 400, result: `Invalid data type - \n content: [${typeof linkCnt}] should be number`})
      }

      querying = (client, cb) => {
        client.query(
            'INSERT INTO _test_board(id, userToken, title, content, likeCnt, linkCnt)'
            +' VALUES($1, $2, $3, $4, $5, $6)',
            [id, userToken, title, content, likeCnt, linkCnt]
        )
            .then(res => console.log(`INSERT INTO TABLE[_test_board] : ${id} `))
            .then(rows => cb(null, rows))
            // .catch(err => cb(err))
            .catch(err => {
              console.log(err)
              if(err.code === '23503') {
                return res.json({status:500, result: `User Not Exist`})
              }
              return res.json({status: 500, result: `Uncaught error occured`})
            })
      }
      callback = _ => res.json({
        status: 200,
        result: 'success',
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
