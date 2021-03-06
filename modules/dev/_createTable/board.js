module.exports = env => (pool, cb) => {
    let tableName = 'board'
    env = env ? `_${env}_` : ''
    tableName = env + tableName

    pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
        + `id           VARCHAR                     NOT NULL,`
        + `user_token   VARCHAR(50)                 NOT NULL,`
        + `like_cnt     INTEGER                     NOT NULL    DEFAULT 0,`
        + `link_cnt     INTEGER                     NOT NULL    DEFAULT 0,`
        + `title        VARCHAR(120),`
        + `content      TEXT,`
        // + `img          JSONB,`
        + `created      TIMESTAMP WITH TIME ZONE  NOT NULL DEFAULT CURRENT_TIMESTAMP,`
        + `updated      TIMESTAMP WITH TIME ZONE,`
        + `PRIMARY KEY ("id"),`
        + `CONSTRAINT "FK__${env}user_auth" FOREIGN KEY ("user_token") REFERENCES "public"."${env}user_auth" ("token") ON UPDATE NO ACTION ON DELETE NO ACTION`
        + `)`
        , function(err, result){
            if(err) return cb(`\n[ERROR] (${tableName})\n -> ${err}\n\n`)

            console.log(` -> (${tableName}) created..`)
            cb(null, pool)
        }
    )
}
