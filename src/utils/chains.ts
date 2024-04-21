export const ten = {
  id: 443,
  name: "Ten Testnet",
  network: "ten-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: {
      http: [
        "https://testnet.ten.xyz/v1/?token=1999a0685471767ececcd830ca81b2a024f07cec",
      ],
    },
    default: {
      http: [
        "https://testnet.ten.xyz/v1/?token=1999a0685471767ececcd830ca81b2a024f07cec",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "TenScan",
      url: "https://testnet.tenscan.io",
    },
  },
  testnet: true,
};
