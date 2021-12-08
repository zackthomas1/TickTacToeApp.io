
// objects and variables
const PlayerEnum = {
    "none" : 0,
    "one": 1, 
    "two": -1, 
}

let boardArr = [[PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],
                [PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],
                [PlayerEnum.none,PlayerEnum.none,PlayerEnum.none],    
            ]

let activePlayer = PlayerEnum.one; 
let playerOneScore = 0; 
let playerTwoScore = 0;

// functions
function updateBoardArr(target, player){

    switch(target.id)
    {
    case "square_1": 
        boardArr [0][0] = player; 
        break;
    case "square_2": 
        boardArr [0][1] = player; 
        break;
    case "square_3": 
        boardArr [0][2] = player; 
        break;
    case "square_4": 
        boardArr [1][0] = player; 
        break;
    case "square_5": 
        boardArr [1][1] = player; 
        break;
    case "square_6": 
        boardArr [1][2] = player; 
        break;
    case "square_7": 
        boardArr [2][0] = player; 
        break;
    case "square_8": 
        boardArr [2][1] = player; 
        break;
    case "square_9": 
        boardArr [2][2] = player; 
        break;
    }
}

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
    }else{
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

function activateGameOverState(winner)
{
    console.log("Game Over State Activated");

    // disable game
    toggleBoardDisable(true);

    // show modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#gameOverModal'))
    if(winner == PlayerEnum.one){
        document.querySelector("#winnerTag").textContent = "Xs won.";
    }else if (winner == PlayerEnum.two){
        document.querySelector("#winnerTag").textContent = "Os won.";
    }else{
        document.querySelector("#winnerTag").textContent = "Tie Game.";
    }
    modal.show();

    // update score board
    updateScoreBoard(winner);
}

function updateGame (target){

    // check space is empty
    if(!target.classList.contains("active")){
        console.warn("Space has already been selected. Please select an open space.");
        return false;
    }

    //update game state
    updateBoardArr(target, activePlayer); 
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
    
    // check for game over state
    let winningPlayer = isGameWon();
    if( winningPlayer !== PlayerEnum.none){
        activateGameOverState(winningPlayer);
    }else if(isBoardFull()){
        activateGameOverState(PlayerEnum.none);
    }

    return true;
}

function resetGame(){
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
document.querySelector("#board").addEventListener('click', function(e){
    console.info("Selection Target ID: " + e.target.id);

    // checks if the board has been disabled
    if(isClassNameOnParentNode(e.target, "disabled") !== null){
        console.warn("Game disabled. Either a player has won or the board is full. Please reset.")
    }else{
        updateGame(e.target); 
    }
});

document.querySelector("#reset_btn").addEventListener('click', function(e)
{
    resetGame();  
});

document.querySelector("#playAgainBtn").addEventListener('click', function(e){
    playAgain();
});

document.querySelector("#closeModalBtn").addEventListener('click', function(e){
    // hide game over modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#gameOverModal'))
    modal.hide();
});