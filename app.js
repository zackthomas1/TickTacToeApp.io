// objects and variables
// ---------------
const gameModeEnum = {
    "local" : 0, 
    "ai" : 1, 
    "network" : 2,
}

const PlayerEnum = {
    "none" : 0,
    "one": 1, 
    "two": -1, 
}

let boardArr = [[PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],
                [PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],
                [PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],    
            ]

let computerAIDifficultyLevel = 0;
let gameMode = gameModeEnum.local;
let activePlayer = PlayerEnum.one; 
let playerOneScore = 0; 
let playerTwoScore = 0;

// functions
// ---------------

function isGameWon()
{
    // check row win
    for(let row = 0; row < boardArr.length; row++){
        let rowTotal = 0;
        for(let col = 0; col < boardArr[0].length; col++){
            rowTotal += boardArr[row][col]; 
        }

        if(rowTotal === 3 || rowTotal === -3){
            if (rowTotal ===3){
                return PlayerEnum.one;
            }else{
                return PlayerEnum.two;
            }
        }
    }

    // check col win
    for(let col = 0; col < boardArr[0].length; col++){
        let colTotal = 0;
        for(let row = 0; row < boardArr.length; row++){
            colTotal += boardArr[row][col]; 
        }

        if(colTotal === 3 || colTotal === -3){
            if (colTotal === 3){
                return PlayerEnum.one;
            }else{
                return PlayerEnum.two;
            }
        }
    }

    //check diagonal left-right win
    let leftRightTotal = 0;
    for(let row = 0; row < boardArr.length; row++){
        let col = row

        leftRightTotal += boardArr[row][col]; 

        if(leftRightTotal === 3 || leftRightTotal === -3){
            if (leftRightTotal === 3){
                return PlayerEnum.one;
            }else{
                return PlayerEnum.two;
            }
        }
    }

    //check diagonal right-left win
    let rightLeftTotal = 0;
    for(let row = 0; row < boardArr.length; row++){
        let col = (boardArr[0].length-1)-row;

        rightLeftTotal += boardArr[row][col]; 

        if(rightLeftTotal === 3 || rightLeftTotal === -3){
            if (rightLeftTotal === 3){
                return PlayerEnum.one;
            }else{
                return PlayerEnum.two;
            }
        }
    }
       
    return PlayerEnum.none
}

function isBoardFull()
{
    for (let row of boardArr){
        for(square of row){
            if(square === PlayerEnum.none){
                return false;
            }
        }
    }
    return true;
}

function isClassNameOnParentNode(child, className){

    let currentNode = child;

    while(currentNode.parentNode !== null)
    {
        // console.log(currentNode);
        if(currentNode.classList.contains(className)){
            return currentNode;
        }
        currentNode = currentNode.parentNode;

    }

    return null;
}

function updateScoreBoard(winner)
{
    if(winner === PlayerEnum.one){
        playerOneScore++; 
        document.querySelector("#player_one_score").textContent = playerOneScore;
    }else if(winner === PlayerEnum.two){
        playerTwoScore++;
        document.querySelector("#player_two_score").textContent = playerTwoScore;
    }
}

function toggleBoardDisable(isDisabled)
{
    if(isDisabled){
        document.querySelector("#board").classList.add("disabled");
    }else{
        document.querySelector("#board").classList.remove("disabled");
    }

}

function updateBoardState(target){
    if(activePlayer == PlayerEnum.one){
        document.querySelector("#currentActivePlayer").textContent = 'O';
        target.textContent = "X"; 
        activePlayer = PlayerEnum.two;
    }else{ 
        document.querySelector("#currentActivePlayer").textContent = 'X';
        target.textContent = "O"; 
        activePlayer = PlayerEnum.one;
    }
    target.classList.remove("active");
}

function activateGameOverState(winner)
{
    console.log("Game Over State Activated");

    // disable game
    toggleBoardDisable(true);

    // show modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#gameOverModal'))
    if(winner == PlayerEnum.one){
        document.querySelector("#winnerTag").textContent = " Xs won.";
    }else if (winner == PlayerEnum.two){
        document.querySelector("#winnerTag").textContent = " Os won.";
    }else{
        document.querySelector("#winnerTag").textContent = " Tie Game.";
    }
    modal.show();

    // update score board
    updateScoreBoard(winner);
}



function aiSetDifficulty(levelID){
    switch(levelID){
        case 'level-0':
            computerAIDifficultyLevel = 0;
            break;
        case 'level-1':
            computerAIDifficultyLevel = 20;
            break;
        case 'level-2':
            computerAIDifficultyLevel = 40;
            break;
        case 'level-3':
            computerAIDifficultyLevel = 60;
            break;
        case 'level-4':
            computerAIDifficultyLevel = 80;
            break;
        case 'level-5':
            computerAIDifficultyLevel = 100;
            break;
    }
}

function aiRandomSelection()
{
    // generate array of available spaces on board
    let avaiableSquares = []
    for(let row = 0; row < boardArr.length; row++){
        for(let col = 0; col < boardArr[0].length; col++){
            // console.log("row: " + row + " col: " + col);
            if(boardArr[row][col] === PlayerEnum.none){
                avaiableSquares.push({row, col});
            }
        }
    }

    // randomly select available square
    const move = avaiableSquares[Math.floor(Math.random() * avaiableSquares.length)]
    // console.log(move);

    // return selection
    return {"row": move.row, "col": move.col} ;
}

function minimax(board, depth, isMaximizingPlayer, maxPlayer)
{   
    //end condition
    const winner = isGameWon();
    if(winner !== PlayerEnum.none){
        return winner * maxPlayer; 
    }else if(isBoardFull())
    {
        return PlayerEnum.none;
    }

    if(isMaximizingPlayer){
        let maxEval = -Infinity; 
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                if(board[i][j] === PlayerEnum.none){
                    activePlayer *= -1; // switch active player
                    board[i][j] = activePlayer; // set board position
                    let eval = minimax(board, depth + 1, false, maxPlayer);
                    maxEval = Math.max(maxEval, eval);
                    board[i][j] = PlayerEnum.none;  // undo set board position
                    activePlayer *= -1; // undo switch active player
                }
            }
        }
        return maxEval;
    }
    else{
        let minEval = +Infinity; 
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                if(board[i][j] === PlayerEnum.none){
                    activePlayer *= -1; // switch active player
                    board[i][j] = activePlayer; // set board position
                    let eval = minimax(board, depth + 1, true, maxPlayer);
                    minEval = Math.min(minEval, eval);
                    board[i][j] = PlayerEnum.none; // undo set board position
                    activePlayer *= -1; // undo switch active player
                }
            }
        }
        return minEval;
    }
}

function aiMinMaxSelection()
{
    let bestScore = -Infinity;
    let bestMove = {row: 0, col: 0};
    for(let i = 0; i < boardArr.length; i++){
        for(let j = 0; j < boardArr[0].length; j++){
            if(boardArr[i][j] === PlayerEnum.none){
               
                boardArr[i][j] = activePlayer; // set board position
                let score = minimax(boardArr,0,false, activePlayer);
                boardArr[i][j] = PlayerEnum.none; // Undo set board position

                if(score > bestScore){
                    bestScore = score; 
                    bestMove = {row: i, col: j};
                }
            }
        }
    }
    return bestMove;
}

function aiMove()
{

    // AI logic
    let rnd = Math.floor(Math.random() * 100);
    let selection = {row: 0, col: 0};
    if( rnd > computerAIDifficultyLevel){
        selection  = aiRandomSelection();
        console.log("AI: random selection")
    }else{
        selection  = aiMinMaxSelection();
        console.log("AI: minimax selection")
    }

    //update game state
    boardArr[selection.row][selection.col] = activePlayer;


    const divElem = ((row, col) => {
        if((row < 0 || row > boardArr.length-1) || (col < 0 || col > boardArr[0].length-1)){
            throw Error("Index out of bounds");
        }
    
        let targetDivElemID = "";
        switch(row){
            case 0: 
                switch(col){
                    case 0: 
                        targetDivElemID = "square_1";
                        break;
                    case 1: 
                        targetDivElemID = "square_2";
                        break;
                    case 2: 
                        targetDivElemID = "square_3";
                        break; 
                }
                break;
            case 1: 
                switch(col){
                    case 0: 
                        targetDivElemID = "square_4";
                        break;
                    case 1: 
                        targetDivElemID = "square_5";
                        break;
                    case 2: 
                        targetDivElemID = "square_6";
                        break; 
                }
                break;
            case 2: 
                switch(col){
                    case 0: 
                        targetDivElemID = "square_7";
                        break;
                    case 1: 
                        targetDivElemID = "square_8";
                        break;
                    case 2: 
                        targetDivElemID = "square_9";
                        break; 
                }
                break;
        }
    
        return document.querySelector("#" + targetDivElemID);
    })(selection.row, selection.col);
    updateBoardState(divElem);
    
    // check for game over state
    // REFACTOR: consider encapsulating into function. Since logic is also in playerMove() function.
    let winningPlayer = isGameWon();
    if( winningPlayer !== PlayerEnum.none){
        activateGameOverState(winningPlayer);
    }else if(isBoardFull()){
        activateGameOverState(PlayerEnum.none);
    }
}


function playerMove (target)
{

    // check space is empty
    if(!target.classList.contains("active")){
        console.warn("Space has already been selected. Please select an open space.");
        return false;
    }

    //update game state
    const selectionIndex = ((t)=> {
        switch(t.id)
        {
        case "square_1": 
            return {"row" : 0, "col": 0};
        case "square_2": 
            return {"row" : 0, "col": 1};
        case "square_3":
            return {"row" : 0, "col": 2};
        case "square_4": 
            return {"row" : 1, "col": 0};
        case "square_5": 
            return {"row" : 1, "col": 1};
        case "square_6": 
            return {"row" : 1, "col": 2};
        case "square_7": 
            return {"row" : 2, "col": 0};
        case "square_8": 
            return {"row" : 2, "col": 1};
        case "square_9": 
            return {"row" : 2, "col": 2};
        }
    })(target);
    boardArr[selectionIndex.row][selectionIndex.col] = activePlayer;
    updateBoardState(target);

    
    // check for game over state
    let winningPlayer = isGameWon();
    if( winningPlayer !== PlayerEnum.none){
        activateGameOverState(winningPlayer);
    }else if(isBoardFull()){
        activateGameOverState(PlayerEnum.none);
    }

    return true;
}

function selectGameMode(selection)
{
    gameMode = selection; 
    const gameModeDisplayElem = document.querySelector("#currentGameMode");
    if (selection === gameModeEnum.local){
        gameModeDisplayElem.textContent = "2-Player Local"
    }else if (selection === gameModeEnum.ai){
        gameModeDisplayElem.innerHTML = "Computer AI" + "<br>Level: " + computerAIDifficultyLevel/20;
    }else if (selection === gameModeEnum.network){
        gameModeDisplayElem.textContent = "2-Player Network"
    }
}

function resetGame()
{
    let boardChildren = document.querySelector("#board").children;

    // iterate through each square on the board
    for(let row of boardChildren){
        let rowChildren = document.querySelector("#" + row.id).children;
        for(let square of rowChildren){
            // console.log(square);
            square.textContent = ""; 
            square.classList.add("active");
        }
    }

    boardArr = [[PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],
                [PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],
                [PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],    
            ];

    activePlayer = PlayerEnum.one; 
    document.querySelector("#currentActivePlayer").textContent = 'X';
    
    toggleBoardDisable(false);

}

function playAgain()
{
    // reset game 
    resetGame(); 

    // hide game over modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#gameOverModal'))
    modal.hide();
}

// event selectors
// ---------------

document.querySelector("#board").addEventListener('click', function(e){
    console.info("Selection Target ID: " + e.target.id);

    // checks if the board has been disabled
    if(isClassNameOnParentNode(e.target, "disabled") !== null){
        console.warn("Game disabled. Either a player has won or the board is full. Please reset.")
    }else{
        if(playerMove(e.target)){
            if(gameMode === gameModeEnum.ai && !isBoardFull() && isGameWon() === PlayerEnum.none){
                aiMove();
            }
        }
    }  
});

document.querySelector("#reset_btn").addEventListener('click', function(e)
{
    resetGame();  
});

document.querySelector("#playAgainBtn").addEventListener('click', function(e){
    playAgain();
});

document.querySelector("#localBtn").addEventListener('click', function(e)
{
    selectGameMode(gameModeEnum.local);

    // hide game mode modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modeModal'))
    modal.hide();

});

document.querySelector("#aiBtn").addEventListener('click', function(e)
{
    selectGameMode(gameModeEnum.ai);

    // hide game mode modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modeModal'))
    modal.hide();

});

document.querySelector("#networkBtn").addEventListener('click', function(e)
{
    selectGameMode(gameModeEnum.network);

    // hide game mode modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modeModal'))
    modal.hide();
});


document.querySelector("#closeModalBtn").addEventListener('click', function(e){
    // hide game over modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#gameOverModal'))
    modal.hide();
});

window.addEventListener('load', function(e){

    // show game mode modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modeModal'))
    modal.show();
});

document.querySelector("#difficultyDownMenu").addEventListener('click', function(e){
    const target = e.target;
    const dropDownBtn = document.querySelector("#difficultyDropDownBtn");
    console.log(target.id);
    dropDownBtn.textContent = target.textContent

    aiSetDifficulty(target.id);

    
})