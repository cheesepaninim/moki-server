exports.create = env => (pool, cb) => {
  let tableName = 'user_auth'
  env = env ? `_${env}_` : ''
  tableName = env + tableName

  pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
      + `token            VARCHAR(50)     NOT NULL,`
      + `social_name      VARCHAR(10)     NOT NULL DEFAULT 'moki',`
      + `salt             VARCHAR(64),`
      + `pwd              VARCHAR(64),`
      + `PRIMARY KEY ("token")`
      + `)`
      + ` ALTER TABLE ${tableName} RENAME COLUMN`
      + `"social_name" TO "socialName"`
      , function(err, result){
        if(err) return cb(`\n\n[ERROR] (${tableName})\n -> ${err}\n\n`)

        console.log(` -> (${tableName}) created..`)
        cb(null, pool)
      }
  )
}

exports.alter = env => (pool, cb) => {
  let tableName = 'user_auth'
  env = env ? `_${env}_` : ''
  tableName = env + tableName

  pool.query(`ALTER TABLE ${tableName} RENAME COLUMN`
      + `"social_name" TO "socialName"`
      , function(err, result){
        if(err) return cb(`\n\n[ERROR] (${tableName})\n -> ${err}\n\n`)

        console.log(` -> (${tableName}) created..`)
        cb(null, pool)
      }
  )
}
