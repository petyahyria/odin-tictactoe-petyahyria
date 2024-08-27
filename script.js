function createGameboard() {
    const gameboard = [ [ "", "", "" ],
                        [ "", "", "" ],
                        [ "", "", "" ] ];
    return {gameboard};
}

function createPlayer(name, marker){
    const score = 0;
    return {name, marker, score};
}

function playGame(){
    const player1 = createPlayer("p1", "X");
    const player2 = createPlayer("p2", "O");
    const gameboard = createGameboard();
    console.table(gameboard.gameboard);
    
    const activePlayer = player1;

    const getPlayerInput = () =>{
        const row = prompt("Enter row (0, 1, 2):");
        const column = prompt("Enter column (0, 1, 2):");
        return [+row, +column];
    }

    const changeActivePlayer = () =>{
        activePlayer === player1 ? player2 : player1;
    }

    const turn = () =>{
        const [row, column] = getPlayerInput();
        
        gameboard.gameboard[row][column] += activePlayer.marker;
        changeActivePlayer();
        console.table(gameboard.gameboard);
        console.log(activePlayer.name);
    }

    turn();

    
}

playGame();





