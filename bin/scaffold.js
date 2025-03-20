const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const rootCwd = process.cwd();

// 获取 args 的最后一个参数
const folderName = process.argv[process.argv.length - 1];
console.log(`Clone playground: ${folderName}`);

// 创建一个临时的文件夹
const osTmpDir = os.tmpdir();
const tmpDir = fs.mkdtempSync(path.resolve(osTmpDir, 'antdx-'));
console.log(`Create tmp dir: ${tmpDir}`);

// 修改当前 cwd 为 tmpDir
process.chdir(tmpDir);

// 执行 git clone 命令
execSync(`git clone --no-checkout https://github.com/ant-design/x.git --depth=1 ./`, {
  stdio: 'inherit',
});
execSync(`git sparse-checkout init --cone`, {
  stdio: 'inherit',
});
execSync(`git sparse-checkout set docs/playground`, {
  stdio: 'inherit',
});
execSync(`git checkout main`, {
  stdio: 'inherit',
});

// 获取当前系统的 tmp 文件夹目录

// console.log(`tmpDirName: ${tmpDirName}`);
