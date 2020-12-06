// module.exports = env => (pool, cb) => {
//     let tableName = 'user_access_log'
//     env = env ? `_${env}_` : ''
//     tableName = env + tableName
//
//     pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
//         + `id               SERIAL,`
//         + `userToken        VARCHAR(50)     NOT NULL,`
//         + `loginDt          TIMESTAMP WITH TIME ZONE  NOT NULL DEFAULT CURRENT_TIMESTAMP,`
//         + `PRIMARY KEY ("id"),`
//         + `CONSTRAINT "FK__${env}user_auth" FOREIGN KEY ("usertoken") REFERENCES "public"."${env}user_auth" ("token") ON UPDATE NO ACTION ON DELETE NO ACTION`
//         + `)`
//         , function(err, result){
//             if(err) return cb(`\n\n[ERROR] (${tableName})\n -> ${err}\n\n`)
//
//             console.log(` -> (${tableName}) created..`)
//             cb(null, pool)
//         }
//     )
// }


exports.create = env => (pool, cb) => {
  let tableName = 'user_access_log'
  env = env ? `_${env}_` : ''
  tableName = env + tableName

  pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
      + `id               SERIAL,`
      + `user_token        VARCHAR(50)     NOT NULL,`
      + `login_dt          TIMESTAMP WITH TIME ZONE  NOT NULL DEFAULT CURRENT_TIMESTAMP,`
      + `PRIMARY KEY ("id"),`
      + `CONSTRAINT "FK__${env}user_auth" FOREIGN KEY ("usertoken") REFERENCES "public"."${env}user_auth" ("token") ON UPDATE NO ACTION ON DELETE NO ACTION`
      + `)`
      , function(err, result){
        if(err) return cb(`\n\n[ERROR] (${tableName})\n -> ${err}\n\n`)

        console.log(` -> (${tableName}) created..`)
        cb(null, pool)
      }
  )
}

exports.alter = env => (pool, cb) => {
  let tableName = 'user_access_log'
  env = env ? `_${env}_` : ''
  tableName = env + tableName

  pool.query(`ALTER TABLE ${tableName} RENAME COLUMN`
      + `"user_token" TO "userToken",`
      + `"login_dt"   TO "loginDt",`
      , function(err, result){
        if(err) return cb(`\n\n[ERROR] (${tableName})\n -> ${err}\n\n`)

        console.log(` -> (${tableName}) created..`)
        cb(null, pool)
      }
  )
}
