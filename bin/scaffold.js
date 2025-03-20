const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const rootCWD = process.cwd();

// const PRESET_BRANCH = 'main';
const PRESET_BRANCH = 'ChainReaction';

// 获取 args 的最后一个参数
const folderName = process.argv[process.argv.length - 1];
const targetFolder = path.join(`docs/playground/${folderName}`);
console.log(`Clone playground: ${targetFolder}`);

// 创建一个临时的文件夹
const osTmpDir = os.tmpdir();
const tmpDir = fs.mkdtempSync(path.resolve(osTmpDir, 'antdx-'));
console.log(`Create tmp dir: ${tmpDir}`);

// 修改当前 cwd 为 tmpDir
process.chdir(tmpDir);

// 执行 git clone 命令
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

// 把 targetFolder 移动到当前目录
const cloneTargetFolder = path.join(rootCWD, '.scaffold');
execSync(`rm -rf ${cloneTargetFolder}`, {
  stdio: 'inherit',
});
execSync(`mv ${path.resolve(tmpDir, targetFolder)} ${cloneTargetFolder}`, {
  stdio: 'inherit',
});

// 收尾
console.log(`Done. see: ${cloneTargetFolder}`);
execSync(`rm -rf ${tmpDir}`, {
  stdio: 'inherit',
});
