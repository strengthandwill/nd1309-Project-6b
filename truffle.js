require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

const infuraKey = process.env.INFURA_KEY || "b45d1acd22264f47ae188fced8e20ef1";
const mnemonic = process.env.MNEMONIC || "spirit supply whale amount human item harsh scare congress discover talent hamster";

module.exports = {  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    }    
  }
};