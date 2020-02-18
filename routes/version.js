const version = require("../controller/version");

const router = {
    get: {
        "/api/version": version.getVersionInfo,
        "/api/v1/version": version.getVersionInfo,
    },
};

module.exports = router;
