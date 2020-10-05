const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require("aws-sdk")

// http://afrobambacar.github.io/2017/03/proccess-env-of-nodejs.html
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const storage = multerS3({
  s3: s3,
  bucket: 'moki-img',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    // TODO:::
    cb(null, `uploads/${req.user_token}/${Date.now()}_${file.originalname}`)
  },
})

exports.upload = multer({ storage })
