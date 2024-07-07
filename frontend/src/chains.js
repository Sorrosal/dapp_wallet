const Ethereum = {
    hex: "0x1",
    name: "Ethereum",
    rpcUrl:
        "https://eth-mainnet.g.alchemy.com/v2/Ow8FMQLkkTNHvFQFu3e3tuH4mgefHfd0",
    ticker: "ETH"
};

const SepoliaTestnet = {
    hex: "0xAA36A7",
    name: "Sepolia Testnet",
    rpcUrl:
        "https://eth-sepolia.g.alchemy.com/v2/Ow8FMQLkkTNHvFQFu3e3tuH4mgefHfd0",
    ticker: "ETH"
};

export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0xAA36A7": SepoliaTestnet
}