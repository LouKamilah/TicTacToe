let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Patron Ganador
let winningPatter = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Jugador "X" juega primero
let xTurn = true;
let count = 0;

//Desactiva todos los botones
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //Enable popup
  popupRef.classList.remove("hide");
};

//Activa todos los botones (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //Disable Pop Up
  popupRef.classList.add("hide");
};

//When a Player Wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' GANA!";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' GANA!";
  }
};

//Funcion para "Empate"
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> EMPATE";
};

//New Game
newGameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//logica
const winChecker = () => {
  for (let i of winningPatter) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      element.innerText = "O";
      element.disabled = true;
    }

    //incrementar el count por cada click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check Winner por cada click
    winChecker();
  });
});

//Enable buttons and disable popup on page load
window.onload = enableButtons;
