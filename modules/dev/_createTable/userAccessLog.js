module.exports = env => (pool, cb) => {
    let tableName = 'userAccessLog'
    env = env ? `_${env}_` : ''
    tableName = env + tableName

    pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
        + `id               SERIAL,`
        + `userToken        VARCHAR(50)     NOT NULL,`
        + `loginDt          TIMESTAMP WITH TIME ZONE  NOT NULL DEFAULT CURRENT_TIMESTAMP,`
        + `PRIMARY KEY ("id"),`
        + `CONSTRAINT "FK__${env}userAuth" FOREIGN KEY ("userToken") REFERENCES "public"."${env}userAuth" ("token") ON UPDATE NO ACTION ON DELETE NO ACTION`
        + `)`
        , function(err, result){
            if(err) return cb(`\n\n[ERROR] (${tableName})\n -> ${err}\n\n`)

            console.log(` -> (${tableName}) created..`)
            cb(null, pool)
        }
    )
}

