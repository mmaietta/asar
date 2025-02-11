/** @type {import('ts-jest').JestConfigWithTsJest} */
const common = {
  preset: 'ts-jest',
  injectGlobals: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*-spec.ts'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  globalSetup: './test/setup/jest.global.setup.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setup/jest.env.setup.ts'],
  testTimeout: 10000
};

module.exports = {
  projects: [
    common,
    {
      ...common,
      runner: '@kayahr/jest-electron-runner/main',
      testMatch: [...common.testMatch, "!**/cli-spec.ts"], // cli isn't accessible within electron main process, right?
      testEnvironmentOptions: {
        electron: {
          options: [], // args for electron (such as 'no-sandbox' & 'force-device-scale-factor=1')
          disableHardwareAcceleration: false,
        },
      },
    }
  ]
};
