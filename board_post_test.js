// const user_token = 'test' // TODO: 임시 user_token
// const { user_token } = req.session
// const { id } = req.body
// const content = req.body.content ? req.body.content : ''
// const img = req.body.img ? req.body.img : {}

// if (!id) {
//   return res.json({ status: 400, result: `Insufficient data - id: ${id}` })
// }
// else {
//   if (typeof id !== 'string') {
//     return res.json({ status: 400, result: `Invalid data type - \n id: [${typeof id}] should be string` })
//   } else if (typeof content !== 'string') {
//     return res.json({ status: 400, result: `Invalid data type - \n content: [${typeof content}] should be string` })
//   } else if (typeof img !== 'object') {
//     return res.json({ status: 400, result: `Invalid data type - \n img: [${typeof img}] should be object` })
//   }
// }
//
// if (Object.keys(img).length !== 0 && i) {
//   Object.keys(img).forEach(val => {
//     if (typeof img[val] !== 'object') {
//       return res.json({ status: 400, result: `Invalid data type - \n img.${val}: [${typeof img[val]}] should be object` })
//     }
//   })
// }

/* call async.series to use pool */
const { series } = require('./utils/pg')
const moment = require('moment')

const queries = []
for(let i=0; i<20; i++) {
  // const user_token = `test_${(i%4)+1}`
  const user_token = `testABC`
  const id = `test_${moment().format('YYYYMMDDHHmm')}_${i+1}`

  console.log(id)

  const title = `TITLE[${i}]_${moment().format('YYYY-MM-DD HH:mm:ss')}`

  const contents = []
  contents.push(`What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and\nmore recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`)
  contents.push(`Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.\n Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`)
  contents.push(`Where does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus\n Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`)
  contents.push(`The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`)

  const content = contents[i%4]

  const img = {}
  const querying = (client, cb) => {
    client.query(
        'INSERT INTO _test_board(id, user_token, title, content, like_cnt, link_cnt) VALUES($1, $2, $3, $4, 0, 0)',
        [id, user_token, title, content]
    )
        .then(res => console.log(`INSERT INTO TABLE[_test_board] : ${id} `))
        .then(rows => cb(null, rows))
        .catch(err => cb(err))
  }

  queries.push(querying)
}

const callback = result => console.log('success')
series(queries, callback)
