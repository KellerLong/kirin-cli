/***
 * 版本管理
 */
class VersionManage {


  /**
   * @deprecated TODO: 获取最新远程版本号
   * @returns {string}
   */
  getLastVersion() {
    return '0.0.1';
  }


  /**
   * @deprecated TODO: 获取本地版本号
   * @returns {string}
   */
  getLocalVersion() {
    return '0.0.1';
  }

  /**
   * @deprecated TODO: 更新到指定版本
   * @return {boolean}
   */
  updateToVersion(version = 'last') {
    return true;
  }
}

module.exports = new VersionManage();