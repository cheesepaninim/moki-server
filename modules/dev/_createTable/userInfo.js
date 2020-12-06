module.exports = env => (pool, cb) => {
    let tableName = 'userInfo'
    env = env ? `_${env}_` : ''
    tableName = env + tableName

    pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
        + `userToken    VARCHAR(50)                 NOT NULL,`
        + `email        VARCHAR(50)                 UNIQUE,`
        + `name         VARCHAR(20)                 NOT NULL,`
        + `intro        VARCHAR(200),`
        + `image        VARCHAR(100)                DEFAULT 'https://dummyimage.com/400x400/4a47a7/fff&text=MOKI',` // TODO: 길이 확인 필요
        + `created      TIMESTAMP WITH TIME ZONE    NOT NULL    DEFAULT CURRENT_TIMESTAMP,`
        + `deleted      TIMESTAMP WITH TIME ZONE,`
        + `follow       VARCHAR[],`
        + `follower     VARCHAR[],`
        + `boardList    JSONB,`
        + `PRIMARY KEY ("userToken"),`
        + `CONSTRAINT "FK__${env}userAuth" FOREIGN KEY ("userToken") REFERENCES "public"."${env}userAuth" ("token") ON UPDATE NO ACTION ON DELETE NO ACTION`
        + `)`
        , function(err, result){
            if(err) return cb(`\n[ERROR] (${tableName})\n -> ${err}\n\n`)

            console.log(` -> (${tableName}) created..`)
            cb(null, pool)
        }
    )
}
