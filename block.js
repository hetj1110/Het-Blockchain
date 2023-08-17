const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
    constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ prevBlock, data }) {
        let hash, timestamp;
        const prevHash = prevBlock.hash;
        const { difficulty } = prevBlock;

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash
        });
    }
}

const genesisBlock = Block.genesis();
const block_1 = new Block({
    timestamp: "02/09/2022",
    prevHash: "0xabc",
    hash: "0xc12",
    data: "Het Joshi",
});
// const block_2 = new Block({timestamp: '03/10/2022', prevHash: '0xc12', hash: '0xb75', data: 'Brij Joshi'});

// const result = Block.mineBlock({prevBlock: block_2, data: "Monkey D. Luffy"})
// console.log(result);

// console.log(genesisBlock);
// console.log(block_1);
// console.log(block_2);

module.exports = Block;
