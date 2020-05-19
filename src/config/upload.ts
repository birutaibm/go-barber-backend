import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: { storage: StorageEngine };
  config: {
    disk: {},
    s3: {
      bucket: string;
    }
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    })
  },

  config: {
    s3: {
      bucket: 'app-gobarber', // TODO usar o nome que foi criado no AWS S3
    },
    disk: {},
  }
} as IUploadConfig;
