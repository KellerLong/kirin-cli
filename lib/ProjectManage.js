const readline = require('readline');
const util = require('./Util');
const inquirer = require('inquirer');

const inputConfig = require('./InputConfig');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/***
 * 项目管理
 */
class ProjectManage {

  constructor() {
    this.packageName = ''; // 包名
    this.projectPath = ''; // 项目地址
  }

  /**
   * @deprecated 初始化一个项目
   */
   async run(dirName) {
    // 设置默认项目名
    inputConfig[0].default = dirName;
    const answers = await inquirer.prompt(inputConfig);
    console.log(answers);
  }

  /**
   * @deprecated 初始化目录
   * @param dirName
   * @returns {Promise<any>}
   */
  initProjectPath(dirName) {
    return new Promise((resolve, reject) => {
      if (!dirName) {
        // 没有文件夹 让对方传入文件夹名并创建文件夹
        return rl.question('Please enter target dir:  (.) ', name => {
          if (!name) {
            return this.run('.').then(resolve);
          }
          this.run(name).then(resolve);
        });
      }

      let projectDir = dirName === '.' ? '' : dirName;
      projectDir && util.createDir(projectDir);
      // 完整地址
      this.projectPath = `${process.cwd()}/${projectDir}`;


      rl.close();
      resolve(dirName);
    });
  }

  getProjectAddress() {
    return new Promise((resolve, reject) => {

      return rl.question('Please enter target dir:  (.) ', name => {
        if (!name) {
          return this.run('.').then(resolve);
        }
        this.run(name).then(resolve);
      });

    });
  }

  /**
   * @deprecated TODO: 初始化一个基础项目
   * @returns {boolean}
   */
  initProjectBase(dir) {
    if (!dir) {
      throw new Error('project dir is not find!');
    }
    this.packageName = '';
    return true;
  }

  /**
   * @deprecated TODO: 初始化一个空项目
   * @returns {boolean}
   */
  initProjectBase(dir) {
    if (!dir) {
      throw new Error('project dir is not find!');
    }
    this.packageName = '';
    return true;
  }

  /**
   * @deprecated TODO: 初始化一个demo项目
   * @returns {boolean}
   */
  initProjectBase(dir) {
    if (!dir) {
      throw new Error('project dir is not find!');
    }
    this.packageName = '';
    return true;
  }

  getPackage() {
    return true;
  }
}

module.exports = new ProjectManage();