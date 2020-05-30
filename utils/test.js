module.exports = (client, cb) => {
    client.query('SELECT NOW()')
        .then(res => res.rows[0])
        // .then(_ => {
        //     const err = new Error()
        //     throw err
        // })
        .then(rows => cb(null, rows))
        .catch(err => cb(err))
}
