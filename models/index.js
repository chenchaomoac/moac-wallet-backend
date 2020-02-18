const { Sequelize } = require("sequelize");
const DBInfo = require("../config").db;

const sequelize = new Sequelize(DBInfo.name, DBInfo.user, DBInfo.password, {
    host: DBInfo.addr, // 数据库地址,默认本机
    port: DBInfo.port,
    dialect: "mysql",
    pool: {
        // 连接池设置
        max: 5, // 最大连接数
        min: 0, // 最小连接数
        idle: 10000,
    },
    // 是否将undefined转化为NULL
    // - 默认: false
    omitNull: true,
    // 是否开始日志，默认是用console.log
    // 建议开启，方便对照生成的sql语句
    logging: false,
    // 数据库默认参数,全局参数
    define: {
        underscored: false,
        freezeTableName: true,
        charset: "utf8",
        dialectOptions: {
            collate: "utf8_general_ci",
        },
        timestamps: false,
    },
    // 是否同步
    sync: { force: true },
});

const Erc20 = sequelize.import("./Erc20");
const EthErc20 = sequelize.import("./EthErc20");

module.exports = {
    sequelize,
    Erc20,
    EthErc20,
};
