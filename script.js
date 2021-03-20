let playBtn = document.querySelector("#play");
playBtn.onclick = function () {
  window.open("./game.html");
};

let trophy = document.querySelector("#trophy");

trophy.onclick = function () {
  let data = localStorage.getItem("leaderBoard");
  if (data) {
    showLeaderBoard(JSON.parse(data));
  } else {
    showLeaderBoard([]);
  }
};
