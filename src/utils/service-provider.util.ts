export class ServiceProvider {
  private static _instance: ServiceProvider;

  private static _services: Record<string, unknown> = {};

  static getInstance(): ServiceProvider {
    if (!ServiceProvider._instance) {
      ServiceProvider._instance = new ServiceProvider();
    }
    return ServiceProvider._instance;
  }

  getService<T>(ClassConstructor: new (...args: unknown[]) => T, ...args: unknown[]): T {
    const serviceInstance = ServiceProvider._services[ClassConstructor.name];
    return (serviceInstance || new ClassConstructor(...args)) as T;
  }
}
export default ServiceProvider.getInstance();
