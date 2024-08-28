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
        const row = prompt("Enter row (0, 1, 2):");
        const column = prompt("Enter column (0, 1, 2):");
        return [(+row), (+column)];
    }

    const changeActivePlayer = () =>{
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
    


    const checkWinner = () => { 
        let winMarker = "";
        const gameboardArray = gameboard.gameboard;

        gameboardArray.forEach(el=>{
            if(el.every(elem => elem === "X")){
                winMarker = "X";
            }
            if(el.every(elem => elem === "O")){
                winMarker = "O";
            }
        });
        
        for(let i = 0; i<3; i++){
            if(gameboardArray.every(el=>el[i] === "X")){
                winMarker = "X";
            }
            if(gameboardArray.every(el=>el[i] === "O")){
                winMarker = "O";
            }
        }

        if(gameboardArray[0][0] === "X" && gameboardArray[1][1] === "X" && gameboardArray[2][2] === "X"){
            winMarker = "X";
        }

        if(gameboardArray[0][0] === "O" && gameboardArray[1][1] === "O" && gameboardArray[2][2] === "O"){
            winMarker = "O";
        }

        if(gameboardArray[0][2] === "X" && gameboardArray[1][1] === "X" && gameboardArray[2][0] === "X"){
            winMarker = "X";
        }

        if(gameboardArray[0][2] === "O" && gameboardArray[1][1] === "O" && gameboardArray[2][0] === "O"){
            winMarker = "O";
        }

        let winner = "";

        
        if(winMarker === player1.marker){
            winner = player1.name;
        }else if(winMarker === player2.marker){
            winner = player2.name;
        }

        let tie = false;

        if(gameboardArray[0].every(el => el !== "") && gameboardArray[1].every(el => el !== "") && gameboardArray[2].every(el => el !== "")){
            tie = true;
        }

        let someoneWins = winMarker ? true : false;

        return {someoneWins, winner, tie};
    }

    const turn = () =>{
        const [row, column] = getPlayerInput();
        if (!gameboard.gameboard[row][column]){
            gameboard.gameboard[row][column] += activePlayer.marker;
            changeActivePlayer();
            console.table(gameboard.gameboard);
            console.log(activePlayer.name);
            const {someoneWins, winnerName, tie} = checkWinner();
            if(someoneWins){
                console.log(`Congratulations! ${winnerName} wins!`);
            }else if(!tie){
                turn();
            }else{
                console.log("Tie.")
            }
        }else{
                console.log("This cell is alredy filled.");  
                turn();
        }
    }

    turn();
}

playGame();





