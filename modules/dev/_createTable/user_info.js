module.exports = env => (pool, cb) => {
    let tableName = 'user_info'
    env = env ? `_${env}_` : ''
    tableName = env + tableName

    pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
        + `user_token   VARCHAR(50)                 NOT NULL,`
        + `email        VARCHAR(50)                 UNIQUE,`
        + `name         VARCHAR(20)                 NOT NULL,`
        + `intro        VARCHAR(200),`
        + `image        VARCHAR(100),` // TODO: 길이 확인 필요
        + `created      TIMESTAMP WITH TIME ZONE    NOT NULL    DEFAULT CURRENT_TIMESTAMP,`
        + `deleted      TIMESTAMP WITH TIME ZONE,`
        + `follow       VARCHAR[],`
        + `follower     VARCHAR[],`
        + `board_list   JSONB,`
        + `PRIMARY KEY ("user_token"),`
        + `CONSTRAINT "FK__${env}user_auth" FOREIGN KEY ("user_token") REFERENCES "public"."${env}user_auth" ("token") ON UPDATE NO ACTION ON DELETE NO ACTION`
        + `)`
        , function(err, result){
            if(err) return cb(`\n[ERROR] (${tableName})\n -> ${err}\n\n`)

            console.log(` -> (${tableName}) created..`)
            cb(null, pool)
        }
    )
}
