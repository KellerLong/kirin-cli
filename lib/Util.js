const fs = require('fs');

/***
 * 常用方法
 */
class Util {

  // TODO: 创建目录 后面可能有路径遍历创建
  createDir(dirpath) {
    dirpath && fs.mkdirSync(dirpath)
  }


}

module.exports = new Util();