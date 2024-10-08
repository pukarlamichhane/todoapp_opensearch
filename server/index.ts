import { PluginInitializerContext } from '......srccoreserver';
import { TodoappPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new TodoappPlugin(initializerContext);
}

export { TodoappPluginSetup, TodoappPluginStart } from './types';
