document.getElementById("rollButton").addEventListener("click", function () {
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const total = d1 + d2;

  let outcome = "";
  if (total >= 10) {
    outcome = "성공!";
  } else if (total >= 7) {
    outcome = "부분 성공!";
  } else {
    outcome = "실패!";
  }

  document.getElementById("result").innerText =
    `🎲 주사위 결과: ${d1} + ${d2} = ${total} → ${outcome}`;
});