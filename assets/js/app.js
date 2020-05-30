var piece, turnCount = 0,
player1, player2,
player1Score = 0, player2Score = 0,
turn, choice, avatar1, avatar2;


turnText = () => {
    document.getElementById('currentTurn').innerHTML = `Current Turn: ${turn}`;
}

playerScores = () => {
    document.getElementById('players').innerHTML = `<span id='player1'>${player1} - ${player1Score}</span> | <span id='player2'>${player2} - ${player2Score}</span>`;
}

avatarSelection = (value) => {
    console.log(value);
    if (value == 1) {
        return 'geass';
    }
    if (value == 2) {
        return 'britannia';
    } else {
        return 'geass';
    }
}

capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

enterPlayerName = () => {
    player1 = capitalizeFirstLetter(document.getElementById('player1input').value) || 'Player 1';
    player2 = capitalizeFirstLetter(document.getElementById('player2input').value) || 'Player 2';
    avatar1 = document.querySelector('input[name=avatar1input]:checked').value;
    avatar2 = document.querySelector('input[name=avatar2input]:checked').value;
    console.log(avatar1);
    choice = document.querySelector('input[name=choiceOptions]:checked').value;
    if (choice == 1) {
        turn = player1;
    } else {
        turn = player2;
    }

    playerScores();
    turnText();
}

calcWinnerField = (value, v1, v2, v3) => {
    let changeCell;
    changeCell = document.querySelectorAll(`#area${v1}, #area${v2}, #area${v3}`);
    if (value === true) {
            for ( let i = 0; i < changeCell.length; i++ ) {
                changeCell[i].style.backgroundColor = 'blue';
            }
    }
}

makeMove = (id, value) => {
    if (turn == player1) {
        document.getElementById(value).innerHTML = `<img src='./assets/images/${avatar1}.png' class='img-fluid'>`;
        piece = avatar1;
        document.getElementById(value).setAttribute('value', piece);
        document.getElementById(id).removeAttribute('onclick');
        let getValue = document.getElementById(value).getAttribute('value');
        document.getElementById(value).classList.add(getValue);
        window[id] = getValue;
        turn = player2;
        turnText();
    } else {
        document.getElementById(value).innerHTML = `<img src='./assets/images/${avatar2}.png' class='img-fluid'>`;
        piece = avatar2;
        document.getElementById(value).setAttribute('value', piece);
        document.getElementById(id).removeAttribute('onclick');
        let getValue = document.getElementById(value).getAttribute('value');
        document.getElementById(value).classList.add(getValue);
        window[id] = getValue;
        turn = player1;
        turnText();
    }
    turnCount = turnCount + 1;
    console.log(turnCount);

    if ( 
            (area1 === area2 && area2 === area3) || (area4 === area5 && area5 === area6) || (area7 === area8 && area8 === area9) ||
            (area1 === area4 && area4 === area7) || (area2 === area5 && area5 === area8) || (area3 === area6 && area6 === area9) ||
            (area1 === area5 && area5 === area9) || (area3 === area5 && area5 === area7)
        )  {
        if (turn == player2) {
            turn = player1;
            turnText();
            player1Score = player1Score + 1;
        } else {
            turn = player2;
            turnText();
            player2Score = player2Score + 1;
        }

        //Horizontal Winner Check
        calcWinnerField(area1 === area2 && area2 === area3, "1", "2", "3");
        calcWinnerField(area4 === area5 && area5 === area6, "4", "5", "6");
        calcWinnerField(area7 === area8 && area8 === area9, "7", "8", "9");
        //Vertical Winner Check
        calcWinnerField(area1 === area4 && area4 === area7, "1", "4", "7");
        calcWinnerField(area2 === area5 && area5 === area8, "2", "5", "8");
        calcWinnerField(area3 === area6 && area6 === area9, "3", "6", "9");
        //Diagonal Winner Check
        calcWinnerField(area1 === area5 && area5 === area9, "1", "5", "9");
        calcWinnerField(area3 === area5 && area5 === area7, "3", "5", "7");

        var s = document.querySelectorAll('.gamePiece');
        for (let i = 0; i < s.length; i++) {
            s[i].removeAttribute('onclick');
        }
        document.getElementById('gameWin').innerHTML = `${turn} Wins!!!`
        document.getElementById('playAgain').style.display = 'inline';

        playerScores();

        if (player1Score > player2Score) {
            document.getElementById('player1').classList.add('winning');
            document.getElementById('player2').classList.remove('winning');
        } else if (player2Score > player1Score) {
            document.getElementById('player2').classList.add('winning');
            document.getElementById('player1').classList.remove('winning');
        }
    } else if (turnCount >= 9) {
        document.getElementById('gameWin').innerHTML = `IT'S A TIE. NO WINNER!`
        document.getElementById('gameWin').classList.add('gameTie');
        document.getElementById('playAgain').style.display = 'inline';
        var s = document.querySelectorAll('.gamePiece');
        for ( let i = 0; i < s.length; i++ ) {
            s[i].style.backgroundColor = 'orange';
        }
    }
}

resetGame = () => {
    area1 = 1;
    area2 = 2;
    area3 = 3;
    area4 = 4;
    area5 = 5;
    area6 = 6;
    area7 = 7;
    area8 = 8;
    area9 = 9;
    turnCount = 0;
    var s = document.querySelectorAll('.gamePiece');
    for (var i = 0; i < s.length; i++) {
        s[i].setAttribute('onclick', 'makeMove(this.id, event.target.id)');
        s[i].style.backgroundColor = 'black';
        s[i].innerHTML = `<span id='piece${i+1}' class='pieceArea'>&squ;</span>`
        s[i].classList.remove('x', 'o');
    }
    document.getElementById('gameWin').innerHTML = ``;
    document.getElementById('playAgain').style.display = 'none';
    document.getElementById('gameWin').classList.remove('gameTie');
}
