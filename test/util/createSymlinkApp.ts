import path from 'path';
import fs from '../../lib/wrapped-fs';
import rimraf from 'rimraf';
/**
 * Directory structure:
 * testName
 * ├── private
 * │   └── var
 * │       ├── app
 * │       │   └── file.txt -> ../file.txt
 * │       └── file.txt
 * └── var -> private/var
 */
const appsDir = path.join(__dirname, '../..', 'tmp');
let counter = 0;
const createTestApp = async (testName: string, additionalFiles: Record<string, string> = {}) => {
  const outDir = 'app-' + Math.floor(Math.random() * 100);
  const testPath = path.join(appsDir, outDir);

  rimraf.sync(testPath, fs);

  const privateVarPath = path.join(testPath, 'private', 'var');
  await fs.mkdirp(privateVarPath);
  const varPath = path.join(testPath, 'var');
  const appPath = path.join(varPath, 'app');
  await fs.mkdirp(appPath);

  const files = {
    'file.txt': 'hello world',
    ...additionalFiles,
  };
  for await (const [filename, fileData] of Object.entries(files)) {
    const originFilePath = path.join(varPath, filename);
    await fs.writeFile(originFilePath, fileData);
  }

  await safeSymlinkWindows(path.relative(testPath, privateVarPath), varPath);
  await safeSymlinkWindows('../file.txt', path.join(appPath, 'file.txt'));

  return {
    testPath,
    varPath,
    appPath,
  };
};

const safeSymlinkWindows = async (target: string, src: string) => {
  // win32 - symlink: `EPERM: operation not permitted` on node <20 unless using `junction` or running as Admin (for `file`)
  const symlinkType = process.platform !== 'win32' ? 'file' : 'junction';
  await fs.symlink(target, src, symlinkType).catch((e) => {
    if (e.code === 'EEXIST') {
      return;
    }
    throw e;
  });
};

export default createTestApp;
