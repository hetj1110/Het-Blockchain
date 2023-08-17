const INITIAL_DIFFICULTY = 2;

const GENESIS_DATA = {
    timestamp: "11/10/2001",
    prevHash: '0x00000000',
    hash: '0x00000011',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: ['DragonBall', 'One piece', 'Naruto', 'Bleach']
}

module.exports = { GENESIS_DATA };