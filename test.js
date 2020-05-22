// const pg  = require('pg')
// const pool = new pg.Pool()


const opt = {
  user: 'postgres',
  host: 'moki.cklbgvlyzed5.ap-northeast-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'moki12#$',
  port: 5432
}

const { Pool, Client } = require('pg')

// Connecting..
const client = new Client(opt)
const connecting = async () => {
  await client.connect()

  const select = 'SELECT age from test as message'
  const param = ['age']

  // const res = await client.query(select, param)
  // const result = res.rows[0].message
  const res = await client.query(select)
  const result = res.rows[0]

  await client.end()

  return result
}
const connResult = connecting().then(res => console.log(res))



// Pooling..
const pool = new Pool(opt)
const pooling = async () => {
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })

  // you can also use async/await
  const res1 = await pool.query('SELECT NOW()')
  await pool.end()

  // clients will also use environment variables
  // for connection information
  const client = new Client()
  await client.connect()

  const res2 = await client.query('SELECT NOW()')
  await client.end()

  // console.log(res1.rows[0].rows)
  // console.log(res2.rows[0])

  return { res1: res1.rows, res2: res2.rows }
}
// const poolResult = pooling().then()
