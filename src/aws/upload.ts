/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import multer from 'multer'
import multerS3 from 'multer-s3'
import { clientS3 } from './clientS3'

const upload = multer({
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
