const appContainer = document.getElementById("root");
const gameLive = "spacetraders is currently online and available to play";
const statusIndicator = document.getElementById("gameStatus");

init();
function init() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open("GET", "https://api.spacetraders.io/game/status", true);

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      if (data.status == gameLive) {
        statusIndicator.style.backgroundColor = "green";
      } else {
        statusIndicator.style.backgroundColor = "red";
      }
    }
  };

  // Send request
  request.send();
}
