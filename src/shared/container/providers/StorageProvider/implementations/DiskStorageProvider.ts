import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from "../models/IStorageProvider";

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string) {
    fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string) {
    const completePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(completePath);
    } catch {
      return;
    }
    await fs.promises.unlink(completePath);
  }
}
