const { rpc } = require("../config");
const Chain3 = require("chain3");
const chain3 = new Chain3(new Chain3.providers.HttpProvider(rpc));

const waitBlock = (number, timeout) => {
    const startNumber = chain3.mc.blockNumber;
    const startTime = Date.now();

    const filter = chain3.mc.filter("latest");
    const block = new Promise((resolve, reject) => {
        filter.watch((err, hash) => {
            if (err) {
                return;
            }
            const currentNumber = chain3.mc.blockNumber;
            const currentTime = Date.now();

            if (currentNumber - startNumber >= number) {
                resolve();
                return;
            }

            if (currentTime - startTime >= timeout * 1000) {
                // reject();
                resolve();
                return;
            }
        });
    });

    return block;
};

const getContractAddress = (txHash) => {
    const receipt = chain3.mc.getTransactionReceipt(txHash);
    if (!receipt) {
        return;
    }
    const contractAddress = receipt.contractAddress;
    return contractAddress;
};

const isValidContract = async (contractAddress) => {
    const code = chain3.mc.getCode(contractAddress);

    if (code === "0x") {
        return false;
    } else {
        return true;
    }
};

module.exports = {
    waitBlock,
    getContractAddress,
    isValidContract,
};
