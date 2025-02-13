import { existsSync, rmdirSync } from 'fs';
import { platform } from 'os';
import { TEST_APPS_DIR } from '../util/constants';

test.if = (condition: boolean) => (condition ? test : test.skip);
test.ifWindows = test.if(platform() === 'win32');
test.ifNotWindows = test.if(platform() !== 'win32');

beforeAll(() => {
  if (existsSync(TEST_APPS_DIR)) rmdirSync(TEST_APPS_DIR, { recursive: true });
});
