import ICacheProvider from "../models/ICacheProvider";

export default class FakeCacheProvider implements ICacheProvider {
  private cache:{[key: string]: any} = {};

  public async save<T>(key: string, value: T): Promise<void> {
    this.cache[key] = value;
  }

  public async recover<T>(key: string): Promise<T | null> {
    return this.cache[key] || null;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }
}
