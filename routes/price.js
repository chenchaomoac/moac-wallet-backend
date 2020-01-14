const price = require("../controller/price");

const router = {
    get: {
        "/api/price/moac": price.getMoacPrice,
    },
};

module.exports = router;
