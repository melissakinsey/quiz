// Display leaderboard as a numbered list of scores
function showLeaderBoard(list) {
  let leaderBoard = document.querySelector("#leaderBoard");

  let listStr = "";
  // Arrange items (initials: score) in descending order, with highest score at top of list
  list.sort((a, b) => b.score - a.score);
  list.forEach((item) => {
    listStr += `
          <li>${item.initials}: ${item.score}</li>
          `;
  });
  // Show leaderboard on Bootstrap modal that pops up at the end of game and clicks closed.
  leaderBoard.innerHTML = `
      <div id="myModal" class="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="fas fa-trophy"></i> Leaderboard</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <ul>${listStr}</ul>
            </div>
          </div>
        </div>
      </div>
    `;
  var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
    keyboard: false,
  });
  myModal.show();
}
