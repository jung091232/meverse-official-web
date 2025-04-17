
let web3;
let contract;
const contractAddress = "0x175aA06A06382034188bC95844762bc840ecB4de";
const abi = [{
  "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
  "name": "buy",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}];

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

async function buyTokens() {
  const amount = document.getElementById("amount").value;
  const accounts = await web3.eth.getAccounts();
  try {
    await contract.methods.buy(amount).send({
      from: accounts[0],
      value: web3.utils.toWei("0.01", "ether")
    });
    document.getElementById("status").innerText = "✅ Purchase successful";
  } catch (error) {
    document.getElementById("status").innerText = "❌ Error: " + error.message;
  }
}
