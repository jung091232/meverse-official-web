
function copyReferral() {
  const copyText = document.getElementById("ref-link");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  alert("Referral link copied!");
}
