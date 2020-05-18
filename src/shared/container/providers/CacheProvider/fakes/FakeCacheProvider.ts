import ICacheProvider from "../models/ICacheProvider";

export default class FakeCacheProvider implements ICacheProvider {
  private cache:{[key: string]: string} = {};

  public async save(key: string, value: string): Promise<void> {
    this.cache[key] = value;
  }

  public async recover(key: string): Promise<string | null> {
    return this.cache[key] || null;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }
}
