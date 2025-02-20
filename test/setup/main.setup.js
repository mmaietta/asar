const { app } = require('electron');
// `app` is undefined when running just `mocha`
if (app) {
  // resolves (unimpacting/noisy) logs of "viz_main_impl.cc(186)] Exiting GPU process due to errors during initialization"
  app.disableHardwareAcceleration();
}
