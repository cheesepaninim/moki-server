const shortid = require('shortid')
const faker = require('faker')

module.exports = (req, res) => {
  const { url, method, body, params } = req

  // 입력 값이 없는 경우 'test' 계정
  const testUsers = ['test', 'test01', 'test02', 'test03', 'test04']

  const num = params.num
  if (num > 100) return res.json({ status: 400, result: `[Request Number: ${num}] exceeded the maximum 100` })

  /* call async.series to use pool */
  const { series } = require('../../../utils/pg')

  switch (method) {
    case 'POST':
      console.log(`[DUMMY_${method}] ${url}`)

      const queries = []
      for(let i=0; i<num; i++) {
        const id = shortid.generate()  // board_id
        const user_token = body.user_token || testUsers[i%5]
        const title = faker.fake("'{{name.title}}' by {{name.lastName}} {{name.firstName}}.")
        const content = `${faker.lorem.lines()}\n<img src="${faker.image.imageUrl}"/><br/><br/>${faker.lorem.sentences()}<br/>${faker.lorem.sentences()}${faker.lorem.sentences()}`
        const like_cnt = Math.floor(Math.random()*10001)
        const link_cnt = Math.floor(Math.random()*10001)

        const querying = (client, cb) => {
          client.query(
              'INSERT INTO _test_board(id, user_token, title, content, like_cnt, link_cnt)'
              + ' VALUES($1, $2, $3, $4, $5, $6)',
              [id, user_token, title, content, like_cnt, link_cnt]
          )
              .then(res => {if(i%10 === 0) {console.log(`INSERT INTO TABLE[_test_board].. COUNT: ${i+1}`)}})
              .then(rows => cb(null, rows))
              // .catch(err => cb(err))
              .catch(err => {
                console.log(err)
                if (err.code === '23503') {
                  return res.json({status: 500, result: `User Not Exist`})
                }
                return res.json({status: 500, result: `Uncaught error occured`})
              })
        }
        queries.push(querying)
      }

      const callback = _ => res.json({
        status: 200,
        result: 'success',
        message: `[TOTAL: ${num}] board created`,
      })

      series(queries, callback)

      break

    default:
      console.log(`[${method}] ${url}`)
      res.json({status: 405, result: 'Method Not Allowed'})
      break
  }
}
