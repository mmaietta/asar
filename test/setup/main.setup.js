const { app } = require('electron');
// `app` is undefined when running just `mocha`
if (app) {
  // needed to run electron-mocha within docker container as user is `root`.
  app.commandLine.appendSwitch('no-sandbox');
  //   app.commandLine.appendSwitch('headless');
  // Forces Electron not to start dbus
  // Resolves tests logging "Failed to connect to the bus: Failed to connect to socket /run/dbus/system_bus_socket: No such file or directory"
  //   app.commandLine.appendSwitch('remote-debugging-port', '9222');
  // resolves (unimpacting/noisy) logs of "viz_main_impl.cc(186)] Exiting GPU process due to errors during initialization"
  app.disableHardwareAcceleration();
}
