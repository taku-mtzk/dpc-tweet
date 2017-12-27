const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');


convertBtn.onclick = function () {
  const inputDate = document.getElementById('inputDate');
  const inputTime = document.getElementById('inputTime');
  const inputPlace = document.getElementById('inputPlace');
  const inputDesc = document.getElementById('inputDesc');

  const outputDate = document.getElementById('outputDate');
  const outputTime = document.getElementById('outputTime');
  const outputPlace = document.getElementById('outputPlace');
  const outputDesc = document.getElementById('outputDesc');

  outputDate.innerText = inputDate.value;
  outputTime.innerText = inputTime.value;
  outputPlace.innerText = inputPlace.value;
  outputDesc.innerHTML = inputDesc.value;

  const results = document.getElementById('tweetContents').innerText.length;
  const count = document.getElementById('count');

  count.innerHTML = results;
};

copyBtn.onclick = function () {
  const copyTarget = document.getElementById('tweetContents');
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNode(copyTarget);
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');
};
