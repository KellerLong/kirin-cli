const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const inputConfig = require('./InputConfig');
const download = require('download-git-repo');
const fs = require('fs-extra');
const alphabet = require('alphabetjs');
const colors = require('colors');
const ora = require('ora');
const update = require('npm-update')
const pkg = require('../package.json')
/***
 * 项目管理
 */
class ProjectManage {

  constructor() {
    this.projectOption = {};
  }

  /**
   * @deprecated 初始化一个项目
   */
   async run(dirName) {
    const str = alphabet('kirin','planar');
    console.log(colors.green(str));

    // 检测更新
    const { needUpdate } = await update({ pkg });
    // if (!needUpdate)  {
    //   return false;
    // }


    // 设置默认项目名
    inputConfig[0].default = dirName;
    this.projectOption = await inquirer.prompt(inputConfig);
    this.projectOption.dirName = dirName;

    if ( 'empty' === this.projectOption.template ) {
      await this.initProjectEmpty();
    }

    if ( 'base' === this.projectOption.template ) {
      await this.initProjectBase();
    }

    if ( 'demo' === this.projectOption.template ) {
      await this.initProjectDemo();
    }
  }


  /**
   * @deprecated TODO: 初始化一个基础项目
   * @returns {boolean}
   */
  async initProjectBase() {
    await this.getPackage();
    this.printUsage();
    return true;
  }

  /**
   * @deprecated TODO: 初始化一个空项目
   * @returns {boolean}
   */
  async initProjectEmpty(dir) {
    await this.getPackage();
    this.printUsage();
    return true;
  }

  /**
   * @deprecated TODO: 初始化一个demo项目
   * @returns {boolean}
   */
  async initProjectDemo(dir) {
    await this.getPackage();
    this.printUsage();
    return true;
  }

  getPackage() {
    return new Promise( (resolve, reject) => {
      const downloadPath  = 'KellerLong/kirin-template';
      const savePath      = path.join(os.tmpdir(), 'kirin-template');
      const copyPaht      = path.join(savePath, this.projectOption.template);
      const projectPath   = path.join(process.cwd(), this.projectOption.dirName);


      const spinner = ora({
        text: colors.blue('Downloading...'),
        spinner: 'point',
        color: 'blue'
      }).start();

      download(downloadPath, savePath, err => {
        if ( err ) {
          spinner.fail('Download failed!');
          return reject(false);
        }

        fs.copySync(copyPaht, projectPath);

        const packagePath = path.join(projectPath, 'package.json');
        let packageContent = fs.readFileSync(packagePath, 'utf-8');
        for ( const key in this.projectOption ) {
          packageContent = packageContent.replace(
            new RegExp(`\\[${key}\\]`, 'ig'),
            this.projectOption[key]
          );
        }
        fs.writeFileSync(packagePath, packageContent);
        spinner.succeed(colors.green('Download Complete!'));
        resolve(true);
      });
    });
  }

  printUsage() {
    console.log(colors.blue(`usage:
      - cd ${this.targetDir}
      - npm install / yarn
      - npm start / npm run dev / npm test
    `));
  }
}

module.exports = new ProjectManage();
