const appContainer=document.getElementById("root"),gameLive="spacetraders is currently online and available to play",statusIndicator=document.getElementById("gameStatus");function init(){var t=new XMLHttpRequest;t.open("GET","https://api.spacetraders.io/game/status",!0),t.onload=function(){var e=JSON.parse(this.response);t.status>=200&&t.status<400&&(e.status==gameLive?statusIndicator.style.backgroundColor="green":statusIndicator.style.backgroundColor="red")},t.send()}init();