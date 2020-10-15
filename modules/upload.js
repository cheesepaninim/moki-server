exports.beforeUpload = (req, res, next) => {
  const { url, method } = req
  req.user_token = 'test'// TODO: 임시 user_token

  next()
}

exports.afterUpload = (req, res) => {
  // formdata 에 들어간 파일이 아닌 다른 값들은 body 에서 받을 수 있다.
  // console.log(req.body)

  const response = {
    status: 200,
    result: 'Success',
    data: {
      originalName: req.file.originalname,
      size: req.file.size,
      key: req.file.key,
      url: req.file.location
    }
  }

  console.log(response)
  return res.json(response)
}



// router.post('/upload', (req, res) => {
//   console.log(req.body.id)
//   // upload(storage(req.body.id))
//
//   //파일 하나만 업로드 할 때. ex) { img: File }
//   console.log(req.file)
//   /*
//       {
//         fieldname: 'img',
//         originalname: 'pngtree-blue-ocean-free-map-image_257229.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         size: 611161,
//         bucket: 'moki-img',
//         key: 'uploads/1601825845727_pngtree-blue-ocean-free-map-image_257229.jpg',
//         acl: 'public-read',
//         contentType: 'image/jpeg',
//         contentDisposition: null,
//         storageClass: 'STANDARD',
//         serverSideEncryption: null,
//         metadata: { fieldName: 'img' },
//         location: 'https://moki-img.s3.ap-northeast-2.amazonaws.com/uploads/1601825845727_pngtree-blue-ocean-free-map-image_257229.jpg',
//         etag: '"7feee40354116bf025367d6b2461c01b"',
//         versionId: undefined
//       }
//    */
// })
// router.post('/uploadArray', upload.array('img'), (req, res) => {
//   //파일 여러개를 배열로 업로드 할 때. ex) { img: [File,File,File,...] }
//   console.log(req.files)
// })
// router.post('/uploadFields', upload.fields([ {name:'img1'},{name:'img2'},{name:'img3'}]), (req, res) => {
//   //파일을 여러개의 객체로 업로드 할 때.
//   console.log(req.files)
// })
