/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import multer from 'multer'
import multerS3 from 'multer-s3'
import { clientS3 } from './clientS3'

const FILE_TYPE_ACCEPTED = ['image/jpeg', 'image/png']

const upload = multer({
  fileFilter: (_, file, cb) => {
    if (!FILE_TYPE_ACCEPTED.includes(file.mimetype)) {
      cb(new Error('File mimetype is not supported'))
    } else {
      cb(null, true)
    }
  },
  storage: multerS3({
    s3: clientS3,
    bucket: 'mytestbucket',
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (_req, _file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

export { upload }
