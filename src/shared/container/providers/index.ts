import AppError from "@shared/errors/AppError";

type Constructor<T> = () => T;
type Constructors = {[key: string]: Constructor<any>};
type Singletons = {[key: string]: any};

class Providers {
  private constructors: Constructors = {};
  private singletons: Singletons = {};

  registry<T>(name: string, constructor: Constructor<T>) {
    this.constructors[name] = constructor;
  }

  get(name: string) {
    let singleton = this.singletons[name];
    if (!singleton) {
      const constructor = this.constructors[name];
      if (!constructor) {
        throw new AppError('Unregistered singleton ' + name, 500);
      }
      singleton = constructor();
      this.singletons[name] = singleton;
      delete this.constructors[name];
    }
    return singleton;
  }
}

export default new Providers();
