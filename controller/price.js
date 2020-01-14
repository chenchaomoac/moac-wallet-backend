const price = {
    getMoacPrice: async (ctx) => {
        ctx.body = {
            ...global.price,
        };
    },
};

module.exports = price;
