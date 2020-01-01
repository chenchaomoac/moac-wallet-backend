/*
 * @Description: 删除文件
 * @Author: Chen Chao
 * @Date: 2019-06-11 10:41:02
 * @LastEditTime : 2020-01-01 10:10:16
 * @LastEditors  : Please set LastEditors
 */
const fs = require("fs");

/**
 * @description 删除文件
 * @param {String} path 文件路径
 */
const deleteFile = async (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

module.exports = deleteFile;
