## pg module 예시

####series 함수 `require(/utils/pg)`
> series(arg1, arg2, arg3)  

|arg|type|required|
|:---:|:---:|:---:|
|fns(task)| | |
|callback| | |
|| | |
  
```
// pool 을 이용한 쿼리를 날리기 위한 async.series 모듈 호출 
const { series } = require('../../utils/pg')

// client(:pg client), cb(:series callback) 를 인자로 받는 함수 작성 
const querying = (client, cb) => {
  client.query('SELECT * FROM _test_board WHERE id=$1', [params.id])
    .then(res => res.rows[0])
    .then(rows => cb(null, rows))
    .catch(err => cb(err))
}

// async.serires 에서 마지막에 호출할 콜백 함수
const callback = result => res.json({ data: result })

// 함수 실행
series([querying], callback)+

.
.

/*
 * @ series( arg1, arg2, arg3 )
 * 
 * arg1: task 함수 배열 | 필수O
 * arg2: series callback 함수 | 필수X
 * arg3: error handler 함수  | 필수X
 */
series([fn, fn, fn], callback, errHandler)

```
