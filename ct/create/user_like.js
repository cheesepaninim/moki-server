module.exports = env => (pool, cb) => {
    let tableName = 'user_like'
    env = env ? `_${env}_` : ''
    tableName = env + tableName

    pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
        + "user_token   VARCHAR(50)     NOT NULL,"
        + "board_id     VARCHAR         NOT NULL,"
        + "liked        BOOL            NOT NULL    DEFAULT TRUE,"
        + `PRIMARY KEY ("user_token", "board_id"),`
        + `CONSTRAINT "FK_${env}user_like_board" FOREIGN KEY ("board_id") REFERENCES "public"."${env}board" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,`
        + `CONSTRAINT "FK_${env}user_like_user_auth" FOREIGN KEY ("user_token") REFERENCES "public"."${env}user_auth" ("token") ON UPDATE NO ACTION ON DELETE NO ACTION`
        + ")"
        , function(err, result){
            if(err) return cb(`\n[ERROR] (${tableName})\n -> ${err}\n\n`)

            console.log(` -> (${tableName}) created..`)
            cb(null, pool)
        }
    )
}
