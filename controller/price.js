const price = {
    getMoacPrice: async (ctx) => {
        ctx.body = {
            moac: { ...global.price.MOAC },
        };
    },
    getPrice: (ctx) => {
        const { symbol } = ctx.request.query;

        if (!symbol) {
            ctx.body = { ...global.price };
        } else if (symbol === "MOAC") {
            ctx.body = { ...global.price.MOAC };
        } else if (symbol === "ETH") {
            ctx.body = { ...global.price.ETH };
        } else {
            ctx.body = {};
        }
    },
};

module.exports = price;
