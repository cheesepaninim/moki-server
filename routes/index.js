const express = require('express')
const router = express.Router()

const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerOpt = require('../_config/swagger')
const specs = swaggerJsdoc(swaggerOpt)

// pass express
// router.use('/test/board', require('../test/board')(express))
// pass req, res
// router.use('/test/board', (req, res) => require('../test/board')(req, res))
router.get('/', (req, res) => res.json({ data: 'index' }))

// swagger-ui (https://github.com/swagger-api/swagger-ui/blob/HEAD/docs/usage/configuration.md)
// swagger-jsdoc (https://www.npmjs.com/package/swagger-jsdoc)
// https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563
router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(specs, { explorer: true }))

router.use('/auth', require('./auth'))
router.use('/board', require('./board'))
router.use('/dummy', require('./dummy'))

// TODO:: s3 에 업로드 하기 전에 파일 타입 체크?
const { upload } = require('./../utils/upload')
const uploadMod = require('./../modules/upload')
router.use('/upload', uploadMod.beforeUpload)
router.post('/upload', upload.single('img'), uploadMod.afterUpload)

module.exports = router
