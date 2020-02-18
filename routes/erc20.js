const erc20 = require("../controller/erc20");

const router = {
    get: {
        "/api/erc20": erc20.getErc20List,
        "/api/v1/erc20": erc20.getErc20List,
    },
    post: {
        "/api/erc20": erc20.addErc20,
        "/api/v1/erc20": erc20.addErc20,
    },
};

module.exports = router;
