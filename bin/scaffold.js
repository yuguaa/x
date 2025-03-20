#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const rootCWD = process.cwd();

const PRESET_BRANCH = 'main';

// Get the last argument from args
const folderName = process.argv[process.argv.length - 1];
const targetFolder = path.join(`docs/playground/${folderName}`);
console.log(`Clone playground: ${targetFolder}`);

// Create a temporary folder
const osTmpDir = os.tmpdir();
const tmpDir = fs.mkdtempSync(path.resolve(osTmpDir, 'antdx-'));
console.log(`Create tmp dir: ${tmpDir}`);

// Change current working directory to tmpDir
process.chdir(tmpDir);

// Execute git clone command
console.log(`Target folder: ${targetFolder}`);
execSync(
  `git clone --no-checkout https://github.com/ant-design/x.git  --branch ${PRESET_BRANCH} --depth=1 ./`,
  {
    stdio: 'inherit',
  },
);
execSync(`git sparse-checkout init --cone`, {
  stdio: 'inherit',
});
execSync(`git sparse-checkout set ${targetFolder}`, {
  stdio: 'inherit',
});
execSync(`git checkout ${PRESET_BRANCH}`, {
  stdio: 'inherit',
});

// Move targetFolder to the current directory
const cloneTargetFolder = path.join(rootCWD, '.scaffold');
execSync(`rm -rf ${cloneTargetFolder}`, {
  stdio: 'inherit',
});
execSync(`mv ${path.resolve(tmpDir, targetFolder)} ${cloneTargetFolder}`, {
  stdio: 'inherit',
});

// Cleanup
console.log(`Remove tmp dir: ${tmpDir}`);
execSync(`rm -rf ${tmpDir}`, {
  stdio: 'inherit',
});
console.log(`Done. see: ${cloneTargetFolder}`);
