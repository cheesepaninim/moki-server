module.exports = env => (pool, cb) => {
    let tableName = 'userLike'
    env = env ? `_${env}_` : ''
    tableName = env + tableName

    pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(`
        + "userToken    VARCHAR(50)     NOT NULL,"
        + "boardId      VARCHAR         NOT NULL,"
        + "liked        BOOL            NOT NULL    DEFAULT TRUE,"
        + `PRIMARY KEY ("userToken", "boardId"),`
        + `CONSTRAINT "FK_${env}userLike_board" FOREIGN KEY ("boardId") REFERENCES "public"."${env}board" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,`
        + `CONSTRAINT "FK_${env}userLike_userAuth" FOREIGN KEY ("userToken") REFERENCES "public"."${env}userAuth" ("token") ON UPDATE NO ACTION ON DELETE NO ACTION`
        + ")"
        , function(err, result){
            if(err) return cb(`\n[ERROR] (${tableName})\n -> ${err}\n\n`)

            console.log(` -> (${tableName}) created..`)
            cb(null, pool)
        }
    )
}
