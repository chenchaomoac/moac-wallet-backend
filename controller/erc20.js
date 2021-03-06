const { sequelize, Erc20, EthErc20 } = require("../models");
const Op = sequelize.Sequelize.Op;

const Nos = require("../utils/Nos");
const deleteFile = require("../utils/deleteFile");
const chain3 = require("../utils/chain3");
const retry = require("async-retry");

const erc20 = {
    getErc20List: async (ctx) => {
        const { base = "moac", keyword, txHash, page = 1, size = 10 } = ctx.request.query;

        const where = { deleted: 0 };
        if (keyword) {
            if (keyword.startsWith("0x")) {
                where[Op.or] = [
                    // { symbol: { [Op.like]: `%${keyword}%` } },
                    // { name: { [Op.like]: `%${keyword}%` } },
                    { address: { [Op.like]: `${keyword}%` } },
                ];
            } else {
                where[Op.or] = [
                    { symbol: { [Op.like]: `%${keyword}%` } },
                    // { name: { [Op.like]: `%${keyword}%` } },
                    // { address: { [Op.like]: `%${keyword}%` } },
                ];
            }
            where.address = { [Op.ne]: "0x" };
        }
        if (txHash) {
            where.txHash = txHash;
        }

        const result = await (base === "moac" ? Erc20 : EthErc20).findAll({
            attributes: [
                "base",
                "symbol",
                "name",
                "address",
                "decimals",
                "supply",
                "owner",
                "icon",
            ],
            where,
            offset: (page - 1) * size,
            limit: size,
        });
        const response = result.map((value) => {
            return { ...value.dataValues, balance: 0 };
        });
        ctx.body = response;
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
        const rawUrl = await retry(
            async () => {
                const rawUrl = await Nos.upload(fileName, icon.path);
                return rawUrl;
            },
            {
                retries: 5,
            },
        );
        rawUrl && deleteFile(icon.path);
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

        // try {
        const result = await (base === "moac" ? Erc20 : EthErc20).upsert(data);
        if (result) {
            console.log("Insert data success:", data);
        } else {
            console.log("Data exist:", data);
        }
        ctx.body = { success: true };
        // } catch (error) {
        //     console.log("Insert data fail:", error);
        //     ctx.body = { error };
        // }

        if (base === "moac" && txHash && !address) {
            updateContractAddress(txHash);
        }
    },
};

const updateContractAddress = async (txHash) => {
    await chain3.waitBlock(3, 60);
    const contractAddress = chain3.getContractAddress(txHash);
    if (!contractAddress) {
        console.log("Get contract address error:", txHash);
        return;
    }
    if (!chain3.isValidContract(contractAddress)) {
        console.log("Address is not a valid contract address:", contractAddress);
        return;
    }

    const [number] = await Erc20.update({ address: contractAddress }, { where: { txHash } });
    if (number !== 0) {
        console.log("Update contract address success:", contractAddress);
    } else {
        console.log("Update contract address fail:", contractAddress);
    }
};

module.exports = erc20;
