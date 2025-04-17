
let account;

function connectWallet() {
  if (window.ethereum) {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      account = accounts[0];
      document.getElementById("wallet-address").innerText = "Wallet: " + account;
      const refLink = "https://meverse.one/?ref=" + account;
      document.getElementById("ref-link").value = refLink;

      const qrContainer = document.getElementById("qrcode");
      qrContainer.innerHTML = ""; // ✅ 중복 방지 위해 초기화
      new QRCode(qrContainer, {
        text: refLink,
        width: 128,
        height: 128
      });

      simulateReferralData();
    });
  } else {
    alert("Please install MetaMask!");
  }
}

function copyLink() {
  const link = document.getElementById("ref-link");
  link.select();
  link.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied!");
}

function simulateReferralData() {
  const count = Math.floor(Math.random() * 25) + 1;
  const reward = count * 10;
  document.getElementById("ref-count").innerText = count;
  document.getElementById("ref-reward").innerText = reward;

  const list = document.getElementById("ref-list");
  list.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const box = document.createElement("div");
    box.className = "ref-box";
    box.innerText = "0x..." + Math.random().toString(16).substr(2, 4).toUpperCase();
    list.appendChild(box);
  }
}
