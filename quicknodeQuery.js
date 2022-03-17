require("dotenv").config();
let ethers = require("ethers");
const ADDRESS = "0xB07626Bc2fF18d680ec886c3109e9BF6ee05E6b7";

let url = process.env.QUICKNODE_PROVIDER;
console.log(url);
let httpProvider = new ethers.providers.JsonRpcProvider(url);
httpProvider.getBalance(ADDRESS).then((balance) => {
  console.log("eth: " + ethers.utils.formatEther(balance));
});
