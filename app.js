const Koa = require("koa");
const app = new Koa();
const path = require("path");
// const logger = require("./logs");
const config = require("./config");

// 初始化数据库连接
// const DB = require("./database");
// const db = new DB();
// db.init();

// 错误处理中间件
const onerror = require("koa-onerror");
onerror(app);

// 日志中间件
// const log4js = require("koa-log4");
// const logger = log4js.getLogger();
// app.use(logger());
// app.use(log4js.connectLogger(log4js.getLogger(), { level: log4js.levels.INFO }));
const log = require("koa-log");
app.use(log());

// 跨域中间件
const cors = require("koa2-cors");
app.use(
    cors({
        credentials: true,
        origin: "*",
    }),
);

const body = require("koa-body");
app.use(
    body({
        multipart: true, // 支持文件上传
        // encoding: "gzip",
        formidable: {
            uploadDir: path.join(__dirname, "public/images/"), // 设置文件上传目录
            keepExtensions: true, // 保持文件的后缀
            maxFieldsSize: 30 * 1024 * 1024, // 文件上传大小
            // onFileBegin: (name, file) => {
            //     // 文件上传前的设置
            //     console.log(`name: ${name}`);
            //     console.log(file);
            // },
        },
    }),
);

// 鉴权中间件
// if (process.env.ENV !== "test" && process.env.ENV !== "dev") {
//     console.log("Authorization function is loaded.");

//     const { onErr, auth } = require("./middleware/auth");
//     app.use(onErr());
//     app.use(auth());
// }

// 路由中间件
const router = require("./middleware/router");
app.use(router(path.join(__dirname, "routes")));

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

const cronjob = require("./cronjob");
console.log("Cronjob start at:", cronjob.nextInvocation().toLocaleString());

// 设置端口
const port = process.env.PORT || config.port;

module.exports = app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
