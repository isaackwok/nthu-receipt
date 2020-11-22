// chrome.storage.sync.get('color', function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });
// changeColor.onclick = function (element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       { code: 'document.body.style.backgroundColor = "' + color + '";' });
//   });
// };

function submit(e) {
  e.preventDefault();
  let form = e.target;
  let days = form.days.value.trim().split(',');
  let totalHours = parseInt(form.totalHours.value);
  if (totalHours / days.length > 8) {
    alert(`你的天數不足以填滿 ${totalHours} 總時數！`)
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
  // chrome.tabs.sendMessage(
  //   null,
  //   message = { action: "submit", data: {} },
  //   responseCallback = function (response) {
  //     // var selectText = response.text;
  //     // if (selectText.length > 0)
  //     //   chrome.tabs.create({ url: baseURL + selectText });
  //     // else
  //     //   chrome.tabs.create({ url: baseURL + activeTab.url });
  //   }
  // );
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('autofill').addEventListener("submit", submit);
});