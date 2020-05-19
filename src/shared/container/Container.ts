import AppError from "@shared/errors/AppError";

type Constructor<T> = () => T;
type Constructors = {[key: string]: Constructor<any>};
type Singletons = {[key: string]: any};
type InjectedCreator<T> = (...dependencies: any[]) => T;
type InjectedDependencies = string[];
interface InjectionInput<T> {
  creator: InjectedCreator<T>;
  dependencies: InjectedDependencies;
}
type InjectedValue<T> = InjectionInput<T> | T;

class Container {
  private constructors: Constructors = {};
  private singletons: Singletons = {};
  private injected: {[key: string]: InjectedValue<any>} = {};

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

  inject<T>(name: string, {creator, dependencies}: InjectionInput<T>) {
    this.injected[name] = ({creator, dependencies});
  }

  resolve(name: string) {
    const injected = this.injected[name];
    if (injected.creator) {
      const {creator, dependencies} = injected;
      const resolvedDependencies = dependencies.map((key: string) => this.get(key));
      const result = creator(...resolvedDependencies);
      return result;
    }
    return injected;
  }
}

let instance: Container;

function getInstance() {
  if (!instance) {
    instance = new Container();
  }
  return instance;
}

export default getInstance();
