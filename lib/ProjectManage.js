const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const inputConfig = require('./InputConfig');
const download = require('download-git-repo');
const fs = require('fs-extra');


/***
 * 项目管理
 */
class ProjectManage {

  constructor() {
    this.packageName = ''; // 包名
    this.projectPath = ''; // 项目地址
    this.projectOption = {};
  }

  /**
   * @deprecated 初始化一个项目
   */
   async run(dirName) {
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

      console.log('Downloading...');

      download(downloadPath, savePath, err => {
        if ( err ) {throw err;}

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
        console.log('Downloading Complete!');
      });
    });
  }

  printUsage() {
    this.log(`usage:
      - cd ${this.targetDir}
      - npm install / yarn
      - npm start / npm run dev / npm test
    `);
  }
}

module.exports = new ProjectManage();
