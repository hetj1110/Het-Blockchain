const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data,
        });
        this.chain.push(newBlock);
    }

    replaceChai(chain) {
        if (chain.length <= this.chain.length) {
            console.error("The incoming chain is not longer");
            return;
        }
        if (!Blockchain.isValidChain(chain)) {
            console.error("The incoming chain is not Valid");
            return;
        }
        this.chain = chain;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            console.log("Chain is invalid");
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];

            const realLastHash = chain[i - 1].hash;

            if (prevHash !== realLastHash) {
                return false;
            }

            const validateHash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);

            if (hash !== validateHash) {
                return false;
            }
        }
        return true;
    }
}

const blockchain = new Blockchain();

blockchain.addBlock({ data: "Naruto Uzumaki" })
blockchain.addBlock({ data: "Madara Uchiha" })

const result = Blockchain.isValidChain(blockchain.chain);
console.log(blockchain.chain);
console.log(result);

module.exports = Blockchain;