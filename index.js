#!/usr/bin/env node
/**
 * @deprecated the are terminal main
 * */
const program = require('commander');
const projectManage =  require('./lib/ProjectManage');

program
  .version('0.0.1', '-v, --version')
  .option('init [dir]', 'init a project!')
  .parse(process.argv);


function run(pro) {
  if (pro.init) {
    // 初始化一个项目
    let dirName = pro.init;
    // 如果没有传文件夹名  就给一个空的名字 即当前文件夹
    if ( 'boolean' === typeof dirName ) {
      dirName = '.';
    }
    // 开始初始化
    projectManage.run(dirName);
    return true;
  }

  return false;
}


if (!run(program)) {
  program.help();
  process.exit();
}


