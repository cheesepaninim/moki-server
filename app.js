const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const cookieSession = require('cookie-session')
const cookieSessionOpt = require('./config/cookieSession')

app.set('trust proxy', 1)

app.use(
    helmet(),
    express.json(),
    express.urlencoded({ extended: false }),
    cors(),
    cookieSession(cookieSessionOpt)
)

app.use((req, res, next) => {
  /* 요청을 허용할 URL */
  // https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
  res.header('Access-Control-Allow-Origin', '*')

  /* 요청이 허용되는 HTTP Method 목록 */
  // https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

  /* 요청이 허용되는 HTTP Header 목록 */
  // https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
  res.header('Access-Control-Allow-Headers', 'content-type')
  next()
})

const api = require('./routes/index')(express)
app.use('/', api)

const dummyRouter = require('./routes/dummyRouter')(express)
app.use('/dummy', dummyRouter)

const port = 80
// const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server is running on port ${port}`))



// nodejs process.env
// http://afrobambacar.github.io/2017/03/proccess-env-of-nodejs.html
