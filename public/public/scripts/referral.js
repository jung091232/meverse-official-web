
let account;

function connectWallet() {
  if (window.ethereum) {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      account = accounts[0];
      document.getElementById("wallet-address").innerText = "Wallet: " + account;
      const refLink = "https://meverse.one/?ref=" + account;
      document.getElementById("ref-link").value = refLink;

      const qrContainer = document.getElementById("qrcode");
      qrContainer.innerHTML = "";
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
  const referredCount = Math.floor(Math.random() * 50) + 1;
  const myPurchase = 300 + Math.floor(Math.random() * 500); // $300 ~ $800
  const referredTotalPurchase = 500 + referredCount * 50;

  document.getElementById("ref-count").innerText = referredCount;
  document.getElementById("ref-reward").innerText = referredCount * 10;

  const list = document.getElementById("ref-list");
  list.innerHTML = "";
  for (let i = 0; i < referredCount; i++) {
    const box = document.createElement("div");
    box.className = "ref-box";
    box.innerText = "0x..." + Math.random().toString(16).substr(2, 4).toUpperCase();
    list.appendChild(box);
  }

  // 보상 로직
  const qualified = myPurchase >= 300 && referredCount >= 10;
  let rate = 0;
  if (referredCount >= 101) rate = 15;
  else if (referredCount >= 61) rate = 10;
  else if (referredCount >= 51) rate = 9;
  else if (referredCount >= 41) rate = 8;
  else if (referredCount >= 31) rate = 7;
  else if (referredCount >= 21) rate = 6;
  else if (referredCount >= 10) rate = 5;

  const reward = (referredTotalPurchase * rate) / 100;

  document.getElementById("my-purchase").innerText = "$" + myPurchase;
  document.getElementById("total-referred").innerText = "$" + referredTotalPurchase;
  document.getElementById("reward-rate").innerText = rate + "%";
  document.getElementById("reward-estimate").innerText = "$" + reward.toFixed(2);
  document.getElementById("reward-status").innerText = qualified
    ? "✅ 보상 조건 충족"
    : "❌ 보상 조건 미충족 – $300 이상 구매 & 10명 이상 추천 필요";
  document.getElementById("reward-status").className = qualified ? "status-pass" : "status-fail";
}
