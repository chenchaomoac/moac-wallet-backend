const erc20 = require("../controller/erc20");

const router = {
    get: {
        "/api/erc20-list": erc20.getErc20List,
    },
};

module.exports = router;
