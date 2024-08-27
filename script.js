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
    
    let activePlayer = player1;

    const getPlayerInput = () =>{
        const row = prompt("Enter row (1, 2, 3):");
        const column = prompt("Enter column (1, 2, 3):");
        return [(+row-1), (+column-1)];
    }

    const changeActivePlayer = () =>{
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const turn = () =>{
        const [row, column] = getPlayerInput();
        if (!gameboard.gameboard[row][column]){
            gameboard.gameboard[row][column] += activePlayer.marker;
            changeActivePlayer();
            console.table(gameboard.gameboard);
            console.log(activePlayer.name);
            turn();
        }else{
            console.log("This cell is alredy filled.");
            turn();
        }
    }
    turn();
}







