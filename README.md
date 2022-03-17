# eth-query

etherjs and web3js example using quicknode and infura

## installation

npm install

You need to add an .env file containing:

INFURA_ENDPOINT=  
QUICKNODE_PROVIDER=

### What does the example do

gets balance from the ADDRESS provided  
the example does **not** check for pendingTransactions as getPendingTransactions failed using infura

### future addition

After setting up geth, updating the blockchain, it might be interesting to see what it takes to get all transactions of an address.
