const pg = require('./utils/pg')
const test = require('./utils/test')

pg.series(test)
pg.series([test, test, test])

const { client, series} = require('./utils/pg')

console.log(client)
console.log(series)
