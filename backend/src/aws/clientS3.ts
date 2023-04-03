// Create service client module using ES6 syntax.
import { S3Client } from '@aws-sdk/client-s3'
// Set the AWS Region.
const REGION = 'us-east-1'
// Create an Amazon S3 service client object.
const clientS3 = new S3Client({
  region: REGION,
  endpoint: 'http://localstack:4566', // This is the localstack EDGE_PORT
  forcePathStyle: true,
  credentials: {
    accessKeyId: 'hh',
    secretAccessKey: 'dd',
  },
})

export { clientS3 }
