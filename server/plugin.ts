import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '......srccoreserver';

import { TodoappPluginSetup, TodoappPluginStart } from './types';
import { defineRoutes } from './routes';

export class TodoappPlugin implements Plugin<TodoappPluginSetup, TodoappPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('todoapp: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('todoapp: Started');
    return {};
  }

  public stop() {}
}
