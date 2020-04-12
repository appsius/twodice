let scores, roundScore, activePlayer, gamePlaying;

init();

let lastDice;

document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		// random num
		const dice1 = Math.floor(Math.random() * 6) + 1;
		const dice2 = Math.floor(Math.random() * 6) + 1;

		// display result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = `dice-${dice1}.png`;
		document.getElementById('dice-2').src = `dice-${dice2}.png`;

		// update round score acc. to player if dice !== 0
		if (dice1 !== 1 && dice2 !== 1) {
			// add score
			roundScore += dice1 + dice2;
			document.querySelector(
				`#current-${activePlayer}`
			).textContent = roundScore;
		} else {
			// next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		// add current score to glob. score
		scores[activePlayer] += roundScore;

		// update UI
		document.querySelector(`#score-${activePlayer}`).textContent =
			scores[activePlayer];

		let input = document.querySelector('.final-score').value;
		let winningScore;

		// falsy values or truth values
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		// check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document
				.querySelector(`.player-${activePlayer}-panel`)
				.classList.add('winner');
			document
				.querySelector(`.player-${activePlayer}-panel`)
				.classList.remove('active');
			gamePlaying = false;
		} else {
			// next player
			nextPlayer();
		}
	}
});

// Next function
function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector(`#name-0`).textContent = 'Player 1';
	document.querySelector(`#name-1`).textContent = 'Player 2';
	document.querySelector(`.player-0-panel`).classList.remove('winner');
	document.querySelector(`.player-1-panel`).classList.remove('winner');
	document.querySelector(`.player-0-panel`).classList.remove('active');
	document.querySelector(`.player-1-panel`).classList.remove('active');
	document.querySelector(`.player-0-panel`).classList.add('active');
}
