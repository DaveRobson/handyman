const {readFileSync} = require('fs');
const {homedir} = require('os');
const {resolve} = require('path');
const {sync: mkdirpSync} = require('mkdirp');
const hmrc = require('./hmrc').get();



const loadPlugins = () => {
  const path = resolve(homedir(), hmrc.pluginPath, 'node_modules'); 
  const local = resolve(homedir(), hmrc.pluginPath, 'local')

  // init plugin directories if not present
  mkdirpSync(path);
  mkdirpSync(local)

  const plugins = hmrc ? hmrc.plugins : []; 

  return plugins.reduce((resolvedPlugins, plugin) => {
    const resolved = requirePlugin(resolve(path, plugin)); 
    if (resolved) {
      resolvedPlugins.push(resolved);
    }

    return resolvedPlugins;
  }, []);
};

const requirePlugin = pluginPath => {
  try {
    return require(pluginPath);
  } catch (e) {
    console.warn(`Can't find plugin: ${pluginPath}, either remove the plugin from your 
    hmrc or run hm remove ${pluginPath}`);
    return null;
  }
}

//Call the register function on each plugin
const register = (cli, context) => { 
  const plugins = loadPlugins();

  plugins.forEach((plugin) => {
    plugin.register(cli, context);
  });
}

module.exports = {
  register
}