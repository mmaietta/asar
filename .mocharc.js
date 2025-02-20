module.exports = {
  'watch-files': ['test/**/*.js', 'lib/**/*.js'],
  recursive: true,
  reporter: 'spec',
  "require-main": "./test/setup/main.setup.js",
  file: './test/setup/mocha.setup.js', // setup file before everything else loads
  'forbid-only': process.env.CI ?? false, // make sure no `test.only` is merged into `main`
};
