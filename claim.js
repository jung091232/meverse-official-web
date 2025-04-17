
let web3;
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
    "inputs": [],
    "name": "getMyPurchase",
    "outputs": [{"internalType": "uint256","name":"","type":"uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(abi, contractAddress);
    document.getElementById("status").innerText = "✅ Wallet connected";
  } else {
    alert("Please install MetaMask");
  }
}

async function getBalance() {
  const accounts = await web3.eth.getAccounts();
  try {
    const amount = await contract.methods.getMyPurchase().call({ from: accounts[0] });
    document.getElementById("status").innerText = "🎯 You can claim: " + amount + " MVS";
  } catch (err) {
    document.getElementById("status").innerText = "❌ Error fetching balance";
  }
}

async function claimTokens() {
  const accounts = await web3.eth.getAccounts();
  try {
    await contract.methods.claimTokens().send({ from: accounts[0] });
    document.getElementById("status").innerText = "✅ Claim successful!";
  } catch (error) {
    document.getElementById("status").innerText = "❌ Claim failed: " + error.message;
  }
}
