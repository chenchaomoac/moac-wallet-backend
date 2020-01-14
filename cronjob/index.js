const schedule = require("node-schedule");
const rp = require("request-promise");

const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    qs: {
        id: "2403",
        convert: "CNY",
    },
    headers: {
        "X-CMC_PRO_API_KEY": "d83785b8-fab6-46ca-8a9d-f0fa770668fe",
    },
    json: true,
    gzip: true,
};

const job = schedule.scheduleJob("Get Moac Price", "*/6 * * * *", () => {
    rp(requestOptions)
        .then((response) => {
            // const responseExample = {
            //     status: {
            //         timestamp: "2020-01-14T06:22:20.899Z",
            //         error_code: 0,
            //         error_message: null,
            //         elapsed: 13,
            //         credit_count: 1,
            //         notice: null,
            //     },
            //     data: {
            //         "2403": {
            //             id: 2403,
            //             name: "MOAC",
            //             symbol: "MOAC",
            //             slug: "moac",
            //             num_market_pairs: 4,
            //             date_added: "2018-01-15T00:00:00.000Z",
            //             tags: [],
            //             max_supply: null,
            //             circulating_supply: 62463333.6041915,
            //             total_supply: 151205864,
            //             platform: null,
            //             cmc_rank: 264,
            //             last_updated: "2020-01-14T06:21:05.000Z",
            //             quote: {
            //                 CNY: {
            //                     price: 1.6486451879160346,
            //                     volume_24h: 12512.588159594352,
            //                     percent_change_1h: -0.2889546,
            //                     percent_change_24h: 2.46445743,
            //                     percent_change_7d: -3.2496724,
            //                     market_cap: 102979874.36774427,
            //                     last_updated: "2020-01-14T06:21:00.000Z",
            //                 },
            //             },
            //         },
            //     },
            // };

            if (
                response &&
                response.data &&
                response.data["2403"] &&
                response.data["2403"].quote &&
                response.data["2403"].quote["CNY"]
            ) {
                const { price, last_updated } = response.data["2403"].quote["CNY"];
                const now = new Date();
                console.log(now.toLocaleString("zh-CN", { hour12: false }), "\tprice:", price);
                global.price = { MOAC: { price, lastUpdate: last_updated } };
            }
        })
        .catch((err) => {
            console.log("API call error:", err);
        });
});

module.exports = job;
