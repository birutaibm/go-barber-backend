import IStorageProvider from "../models/IStorageProvider";

export default class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async saveFile(file: string) {
    this.files.push(file);
    return file;
  }

  public async deleteFile(file: string) {
    const index = this.files.findIndex(candidate => candidate === file);
    this.files.splice(index, 1);
  }
}
