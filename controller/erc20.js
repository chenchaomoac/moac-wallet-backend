const { sequelize, Erc20 } = require("../models");

const Nos = require("../utils/Nos");
const deleteFile = require("../utils/deleteFile");

const erc20 = {
    getErc20List: async (ctx) => {
        // const { keyword, page = 1, size = 10 } = ctx.request.query;
        const { keyword } = ctx.request.query;

        const Op = sequelize.Sequelize.Op;
        const where = { deleted: 0 };
        if (keyword) {
            where[Op.or] = [
                { symbol: { [Op.like]: `%${keyword}%` } },
                // { name: { [Op.like]: `%${keyword}%` } },
                { address: { [Op.like]: `%${keyword}%` } },
            ];
        }

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
            where,
        });
        ctx.body = result;
    },
    addErc20: async (ctx) => {
        const { icon } = ctx.request.files;
        const { base, symbol, name, address, txHash, decimals, supply, owner } = ctx.request.body;

        if (!(icon && base && symbol && name && decimals && supply)) {
            ctx.status = 400;
            ctx.body = `Missing some fields required in params.`;
            return;
        }
        if (!address && !txHash) {
            ctx.status = 400;
            ctx.body = `Missing "address" or "txHash" field in params.`;
            return;
        }

        const fileName = `${Date.now()}-${icon.name}`;
        const rawUrl = await Nos.upload(fileName, icon.path);
        if (Nos.isExist(fileName)) {
            deleteFile(icon.path);
        }
        const url = rawUrl.split("?")[0];

        const data = {
            base,
            symbol,
            name,
            decimals,
            supply,
            icon: url,
        };
        if (address) {
            data.address = address;
        }
        if (txHash) {
            data.txHash = txHash;
        }
        if (owner) {
            data.owner = owner;
        }

        try {
            const result = await Erc20.upsert(data);
            if (result) {
                console.log("Insert data success:", data);
            } else {
                console.log("Data exist:", data);
            }
            ctx.body = { success: true };
        } catch (error) {
            console.log("Insert data fail:", error);
            ctx.body = { error };
        }
    },
};

module.exports = erc20;
