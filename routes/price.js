const price = require("../controller/price");

const router = {
    get: {
        "/api/price/moac": price.getMoacPrice,
        "/api/v1/price": price.getPrice,
    },
};

module.exports = router;
