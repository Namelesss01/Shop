// Массив данных для меню
export const ts = [
  {
    label: "Профиль",
    link: "profile",
  },
  {
    label: "Пароль",
    link: "password",
  },
  {
    label: "Оферта",
    link: "offer",
    text: `Crypto ipsum bitcoin ethereum dogecoin litecoin. Klaytn solana THETA quant TRON. Kusama PancakeSwap fantom monero kava. Waves terraUSD EOS hedera flow telcoin celo neo PancakeSwap bitcoin. TerraUSD hive kava USD ren stellar ankr enjin terraUSD hedera. Holo uniswap ankr USD PancakeSwap. Shiba-inu chainlink klaytn fantom elrond binance polkadot compound flow.
Celo tether ankr monero arweave stacks PancakeSwap gala ipsum. Terra solana crypto serum bitcoin compound livepeer XRP audius polymath. Livepeer kusama velas chainlink flow kadena polkadot polkadot. Ankr uniswap bitcoin velas chainlink dai THETA aave polygon ICON. Nexo elrond kadena monero stacks TRON hive serum. Siacoin telcoin stellar eCash hedera quant ren. TerraUSD celo harmony secret eCash USD aave stacks PancakeSwap. WAX tether dash bitcoin kava. Audius velas hedera klaytn stellar binance tether. USD shiba-inu dai amp algorand tether enjin tezos. Secret nexo binance XRP siacoin fantom tether velas velas. Stacks PancakeSwap kusama holo holo cardano USD. Bitcoin quant velas crypto celsius dai dogecoin polymath helium. Bitcoin dogecoin horizen XRP kava chiliz chiliz dai flow holo. Decentraland USD arweave binance siacoin amp.
Aave siacoin tezos fantom hedera loopring ipsum ox. Tether monero celo cardano decentraland ICON flow. Tezos audius USD dash flow klaytn ankr siacoin. Horizen zcash chainlink ox loopring polygon polygon. PancakeSwap celsius flow waves golem BitTorrent.
Stellar dai amp algorand ethereum IOTA. Crypto amp velas decred siacoin secret bancor revain bancor revain. Decred holo chainlink maker bancor vechain. TerraUSD XRP eCash BitTorrent siacoin maker elrond solana aave. Ipsum monero.`,
    status:
      localStorage.getItem("offerAcknowledged") === "true"
        ? "Ознакомлен"
        : "Не ознакомлен",
  },
  {
    label: "Инструкции",
    link: "instructions",
  },
];
