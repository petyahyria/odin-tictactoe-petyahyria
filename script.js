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
    return function(playerName1, playerName2){
    
    const player1 = createPlayer(playerName1, "X");
    const player2 = createPlayer(playerName2, "O");
    const gameboard = createGameboard();
    console.table(gameboard.gameboard);
    
    let activePlayer = player1;

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

        let winnerName = "";

        
        if(winMarker === player1.marker){
            winnerName = player1.name;
        }else if(winMarker === player2.marker){
            winnerName = player2.name;
        }

        let tie = false;

        if(gameboardArray[0].every(el => el !== "") && gameboardArray[1].every(el => el !== "") && gameboardArray[2].every(el => el !== "")){
            tie = true;
        }

        let someoneWins = winMarker ? true : false;

        return {someoneWins, winnerName, winMarker, tie};
    }

    const turn = (row, column) =>{
        if (!gameboard.gameboard[row][column] ){
            gameboard.gameboard[row][column] += activePlayer.marker;
            changeActivePlayer();
            console.table(gameboard.gameboard);
            console.log(activePlayer.name);
            
        }else{
                console.log("This cell is alredy filled.");  
        }
    }
    return { turn, gameboard, checkWinner }};
}

function displayGame(playerName1, playerName2){

    const gameObj = playGame()(playerName1, playerName2);
    console.log(gameObj);
    const gameboardArray = gameObj.gameboard.gameboard;
    const createCross = () =>{
        const cross = document.createElement("div");
        cross.classList.add("cross");
        const crossLine1 = document.createElement("div");
        crossLine1.classList.add("cross-right-line");
        const crossLine2 = document.createElement("div");
        crossLine2.classList.add("cross-left-line");
        cross.appendChild(crossLine1);
        cross.appendChild(crossLine2);
        return cross;
    }

    const createNought = () => {
        const nought = document.createElement("div");
        nought.classList.add("nought");
        return nought;
    }

    const render = () =>{   
        gameboardArray.forEach((el, i)=>{
            const row = i;
            el.forEach((elem, column) => {
                const cell = document.querySelector(`#btn${row}${column}`);
                if (elem === "X" && !cell.hasChildNodes()) {
                    cell.appendChild(createCross());
                }else if(elem === "O" && !cell.hasChildNodes()){
                    cell.appendChild(createNought());
                }
            });
        });
    }

    const end = () =>{
        const {someoneWins, winnerName, winMarker, tie} = gameObj.checkWinner();
        console.log(someoneWins);
        const resultContainer = document.querySelector(".result-container");
        const dialog = document.querySelector(".modal");
        if (someoneWins) {
            container.removeEventListener("click", eventFunction);
            const congratulations = `${winnerName}(${winMarker}) wins!`;
            resultContainer.textContent = congratulations;
            dialog.showModal();
        }else if(tie){
            container.removeEventListener("click", eventFunction);   
            const tieDeclaration = "Tie!"
            resultContainer.textContent = congratulations;
            dialog.showModal();
        }
    }

    const container = document.querySelector(".container");
    const eventFunction = e => {
        const target = e.target;
        let ids = ["btn00","btn01","btn02","btn10","btn11","btn12","btn20","btn21","btn22"]

        if (ids.some(el=>el===target.id)) {
            console.log(target.id);
            const row = +target.id[3];
            console.log(target.id[3]);
            const column = +target.id[4];
            gameObj.turn(row, column);
            render();
        }

        end();
    }
    container.addEventListener("click", eventFunction);
}

function start(){
    const startContainer = document.querySelector(".start-container");
    const startBtn = document.querySelector(".start-btn");
    const nameInput1 = document.querySelector("#name1");
    const nameInput2 = document.querySelector("#name2");
    startBtn.addEventListener("click", () => {
        if(nameInput1.value && nameInput2.value){
            displayGame(nameInput1.value, nameInput2.value);
            startContainer.classList.remove("active");
            nameInput1.value = "";
            nameInput2.value = "";
        }else{
            alert("Fill in all fields");
        }
    });
}

start();