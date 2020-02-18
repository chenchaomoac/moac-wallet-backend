const version = {
    getVersionInfo: async (ctx) => {
        ctx.body = {
            "kaba-wallet": {
                version: "0.6.2",
                versionNumber: 602,
                validVersion: "0.0.0",
                validVersionNumber: 0,
                downloadUrl:
                    "https://moac-wallet.nos-eastchina1.126.net/kaba-wallet/kaba-wallet-latest.apk",
            },
        };
    },
};

module.exports = version;
