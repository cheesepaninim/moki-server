# MOKI-server

## Install
```
## Setup
> $ npm i

## Runs the app in dev mode
> $ npm i nodemon -g  
> $ npm run dev
```

## Project Structure
```$xslt
root
 ├ config               // 설정 또는 정보 값들  
 │ ├ column.json        // table, column 목록  
 │ ├ cookieSession.js   // cookieSession 정보  
 │ ├ ec2.json           // aws-ec2 정보  
 │ ├ pg.json            // postgres 접속 정보  
 │ └ regex.json         // regex 목록(e.g. 전화번호, 이메일, 아이디, ...)
 │
 ├ modules              // 개발 코드(query / params / callback / asyncCallback)  
 │                      -> 라우트 경로에 따라 폴더 및 파일 구성  
 │
 ├ routes               // 라우팅  
 │
 ├ utils                // query 등 모듈  
 │ ├ dev                // 테스트 등 내부적으로 사용할 모듈
 │ │ ├ _createTable.js  
 │ │ └ _dummyGen.js  
 │ ├ pg.js  
 │ └ check.js
 │ 
 ├ test                 // 테스트 개발 코드  
 ├ app.js               // 서버 앱  
 └ config.js            // env (ip, port, etc..)  
```

## Dependencies
[express](https://expressjs.com/ko/) : 서버 프레임워크  
[helmet](https://helmetjs.github.io/) : express 보안 (HTTP headers)  
[async](https://caolan.github.io/async/v3/) : 비동기 함수 사용  
[pg](https://node-postgres.com//) : pgSql
