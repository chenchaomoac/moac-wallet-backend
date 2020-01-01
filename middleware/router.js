/*
 * @Description: 自动导入指定文件夹下的所有路由文件，并注册其中的路由
 * @Author: Chen Chao
 * @Date: 2019-06-11 14:21:06
 * @LastEditTime : 2020-01-01 10:11:37
 * @LastEditors  : Please set LastEditors
 */
const router = require("koa-router")();
const fs = require("fs");
const path = require("path");

/**
 * @description 遍历路由文件
 * @param {Object} router 实例化的koa-router对象
 * @param {String} routerDir 指定的文件夹路径
 */
const addRouters = (router, routerDir) => {
    // 遍历文件夹下所有的路由文件
    let files = fs.readdirSync(routerDir).filter((file) => {
        return file.endsWith(".js");
    });
    // 注册指定文件中的路由
    for (const file of files) {
        // console.log(`Adding router: ${file}...`);
        let routerFile = require(path.join(routerDir, file));
        addActions(router, routerFile);
    }
};

/**
 * @description 注册指定文件中的路由
 * @param {Object} router 实例化的koa-router对象
 * @param {String} routerFile 指定的文件路径
 */
const addActions = (router, routerFile) => {
    for (const action of Object.keys(routerFile)) {
        let paths = routerFile[action];
        for (const path of Object.keys(paths)) {
            router[action](path, paths[path]);
            // console.log(`Added router action: ${action} ${path}`);
            console.log(`Router: ${action} ${path}`);
        }
    }
};

/**
 * @description 加载函数
 * @param {String} routerDir 指定的文件夹路径
 * @returns {Object} 实例化的route对象
 */
const loader = (routerDir) => {
    addRouters(router, routerDir);
    return router.routes();
};

module.exports = loader;
