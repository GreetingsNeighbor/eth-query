require("dotenv").config();
const http = require("http");

const Web3 = require("web3");
const url = "https://ENDPOINT.infura.io/v3/" + process.env.PROJECT_ID;
const web3 = new Web3(new Web3.providers.HttpProvider(url));

const ADDRESS = "0xB07626Bc2fF18d680ec886c3109e9BF6ee05E6b7";

let accountBalances = [
  { network: "mainnet", balance: "", hasPendingTransaction: undefined },
  { network: "rinkeby", balance: "", hasPendingTransaction: undefined },
  { network: "ropsten", balance: "", hasPendingTransaction: undefined },
];

async function computeHasPending(index) {
  const pendingTransactions = await web3.eth.getPendingTransactions();
  console.log("pending transaction length:", pendingTransactions.length);
  for (pending of pendingTransactions) {
    if (
      ADDRESS.toLowerCase() === pending.from.toLowerCase() ||
      ADDRESS.toLowerCase() === pending.to.toLowerCase()
    ) {
      accountBalances[index].hasPendingTransaction = true;
      break;
    }
  }
}

async function queryBalances() {
  for (index in accountBalances) {
    let endpoint = url.replace("ENDPOINT", accountBalances[index].network);
    await web3.setProvider(new Web3.providers.HttpProvider(endpoint));
    const result = await web3.eth.getBalance(ADDRESS);
    accountBalances[index].balance =
      web3.utils.fromWei(result, "ether") + " ETH";
    //await computeHasPending(index);
  }
  return accountBalances;
}

queryBalances().then((result) => {
  console.log(accountBalances);
});
