const express = require('express')
const router = express.Router()

// 로그인 체크
router.post('/', (req, res) => require('../modules/user.js')(req, res))
// 회원가입 (O)
router.post('/signup', (req, res) => require('../modules/user.js')(req, res))
// 로그인 (O)
router.get('/signin/:token', (req, res) => require('../modules/user/[token].js')(req, res))
// 로그아웃 (O)
router.get('/signout/:token', (req, res) => require('../modules/user/[token].js')(req, res))

module.exports = router
