const models = require("../models");
const Erc20 = models.import("../models/Erc20");

const response = (data, ctx) => {
    if (data) {
        ctx.status = 200;
        ctx.body = data;
    } else {
        ctx.status = 404;
    }
};

const erc20 = {
    async getErc20List(ctx) {
        const result = await Erc20.findAll({
            attributes: [
                "base",
                "symbol",
                "name",
                "address",
                "balance",
                "decimals",
                "supply",
                "owner",
                "icon",
            ],
            where: {
                deleted: 0,
            },
        });
        response(result, ctx);
    },
};

module.exports = erc20;
