process.env.BABEL_ENV = 'development';

const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appPackageJson = resolveApp('package.json');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../config/webpack.config.dev');
const serverConfig = require('../config/webpack.dev.server');

const isInteractive = process.stdout.isTTY;
const clearConsole = require('react-dev-utils/clearConsole');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const HOST = '0.0.0.0';
choosePort(HOST, 8089)
  .then(port => {
    if (port == null) {
      console.log('We have not found a port.');
      return;
    }

    const appName = require(appPackageJson).name;
    const urls = prepareUrls('http', HOST, port);
    const compiler = createCompiler(webpack, config, appName, urls, false);
    const devServer = new WebpackDevServer(compiler, serverConfig);

    // Launch WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log('Starting the development server...\n');
    });

    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
