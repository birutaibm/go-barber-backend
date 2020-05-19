import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';

import IStorageProvider from "../models/IStorageProvider";

/* TODO configurar no AWS a conta para S3 e verifiacar as configurações
 *  - altere no construtor dessa classe
 *  - altere no @config/upload
 */

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      // TODO verificar se é isso mesmo: region: 'us-east-1',
    });
  }

  public async saveFile(file: string) {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const content = await fs.promises.readFile(originalPath);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    await this.client.putObject({
      Bucket: uploadConfig.config.s3.bucket,
      Key: file,
      ACL: 'public-read',
      Body: content,
      ContentType,
    }).promise();
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string) {
    await this.client.deleteObject({
      Bucket: uploadConfig.config.s3.bucket,
      Key: file,
    }).promise();
  }
}
