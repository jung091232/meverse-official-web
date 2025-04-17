
let web3;
let account;
let contract;

const contractAddress = "0x175aA06A06382034188bC95844762bc840ecB4de";
const abi = [
  {
    "inputs": [],
    "name": "claimTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getMyPurchase",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementById("wallet-address").innerText = "Wallet: " + account;

    contract = new web3.eth.Contract(abi, contractAddress);
    const purchase = await contract.methods.getMyPurchase(account).call();
    const tokens = web3.utils.fromWei(purchase, "ether");
    document.getElementById("purchased").innerText = "Purchased: " + tokens + " MVS";
  } else {
    alert("Please install MetaMask to use this feature.");
  }
}

async function claimTokens() {
  try {
    await contract.methods.claimTokens().send({ from: account });
    document.getElementById("status").innerText = "✅ Tokens successfully claimed!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Claim failed.";
  }
}
