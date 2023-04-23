const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const currScore0El = document.getElementById("current--0");
const currScore1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let curentScore, activePlayer, playerScores, playing;

const init = function () {
  //starting condition

  curentScore = 0;
  activePlayer = 0;
  playing = true;
  playerScores = [0, 0]; //total scores:firs player-position-1,second player-position -2

  currScore0El.textContent = 0;
  score0El.textContent = 0;
  currScore1El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  curentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.Roll random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `image/dice-${dice}.png`;
    //3.chek for 1

    if (dice !== 1) {
      //Add dice  to player current score

      curentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        curentScore;
      // currScore0El.textContent = curentScore; // change later(not only for player one)
    } else {
      //switch to another player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle("player--active");
      // player1El.classList.toggle("player--active");
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.add current score to total score
    playerScores[activePlayer] += curentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      playerScores[activePlayer];

    //2.check  total score >=100
    if (playerScores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    //if yes-declare a winner and stop the game bloking buttnons and clearing the dice picture
    else {
      //else no-swich to another player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
