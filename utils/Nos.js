/*
 * @Description: 网易云对象储存的相关操作方法
 * @Author: Chen Chao
 * @Date: 2019-06-11 10:47:19
 * @LastEditTime : 2020-01-01 10:08:57
 * @LastEditors  : Please set LastEditors
 */
const { NosClient } = require("@xgheaven/nos-node-sdk");
const fs = require("fs");
const config = require("./config");

// 获取访问信息，新建实例
const NosConfig = config.getNosInfo();
const nos = new NosClient({
    accessKey: NosConfig.accessKey,
    accessSecret: NosConfig.accessSecret,
    endpoint: NosConfig.endpoint,
    defaultBucket: NosConfig.defaultBucket,
});

const Nos = {
    /**
     * @description 上传文件
     * @param {String} name 储存到对象储存时显示的文件名
     * @param {String} file 本地文件路径
     * @returns {String} 对象储存上文件的url
     */
    async upload(name, file) {
        return nos
            .putObject({
                objectKey: name,
                body: fs.readFileSync(file),
            })
            .then(() => {
                return nos.getObjectUrl({
                    objectKey: name,
                    expires: 1000,
                });
            })
            .then((url) => {
                return url;
            });
    },

    /**
     * @description 判断是否存在某文件
     * @param {String} name 储存到对象储存时显示的文件名
     * @returns {Boolean} 是否存在某文件
     */
    async isExist(name) {
        return nos.isObjectExist({ objectKey: name });
    },
};

module.exports = Nos;
