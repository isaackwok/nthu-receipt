
function submit(e) {
  e.preventDefault();
  let form = e.target;
  let days = form.days.value.trim().split(',');
  let workingTime = form.period.value === 'all' ? 8 : 4;
  let totalHours = parseInt(form.totalHours.value);
  if (totalHours / days.length > workingTime) {
    alert(`你的天數不足以填滿 ${totalHours} 總時數！`)
    return;
  }
  if (!inputPlan){
      alert(`找不到對應的領據序號！`);
      return;
  }
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    let message = {
      action: "submit",
      month: form.month.value,
      days: days,
      totalHours: totalHours,
      planNo: form.planNo.value,
      workingTime: form.period.value === 'all' ? [8, 13] : form.period.value === 'morning' ? [8] : [13]
    };
    chrome.tabs.sendMessage(activeTab.id, message, function (res) { });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('month').value = String(new Date().getMonth()).padStart(2,0)
  document.getElementById('autofill').addEventListener("submit", submit);
});