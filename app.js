
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

function checkForWinState()
{
    // check row win
    for(let row = 0; row < boardArr.length; row++)
    {
        let rowTotal = 0;
        for(let col = 0; col < boardArr[0].length; col++)
        {
            rowTotal += boardArr[row][col]; 
        }

        if(rowTotal === 3 || rowTotal === -3)
        {
            return true;
        }
    }

    // check col win
    for(let col = 0; col < boardArr[0].length; col++)
    {
        let colTotal = 0;
        for(let row = 0; row < boardArr.length; row++)
        {
            colTotal += boardArr[row][col]; 
        }

        if(colTotal === 3 || colTotal === -3)
        {
            return true;
        }
    }

    //check diagonal left-right win
    let leftRightTotal = 0;
    for(let row = 0; row < boardArr.length; row++)
    {
        let col = row

        leftRightTotal += boardArr[row][col]; 

        if(leftRightTotal === 3 || leftRightTotal === -3)
        {
            return true;
        }
    }

    //check diagonal right-left win
    let rightLeftTotal = 0;
    for(let row = 0; row < boardArr.length; row++)
    {
        let col = (boardArr[0].length-1)-row;

        rightLeftTotal += boardArr[row][col]; 

        if(rightLeftTotal === 3 || rightLeftTotal === -3)
        {
            return true;
        }
    }
       
    return false;
}

function activateGameOverState()
{
    console.log("Game OVER!!!!");
}

function updateGame (target){

    // check space is empty
    if(!target.classList.contains("active")){
        console.warn("Space has already been selected. Please select an open space.");
        return false;
    }

    updateBoardArr(target, activePlayer); 

    if(activePlayer == PlayerEnum.one){
        target.textContent = "X"; 
        activePlayer = PlayerEnum.two;
    }else{ 
        target.textContent = "O"; 
        activePlayer = PlayerEnum.one;
    }
    target.classList.remove("active");
    
    if(checkForWinState()){
        activateGameOverState();
    }

    return true;
}

function resetGame(){
    
}

// event selectors
document.querySelector("#board_container").addEventListener('click', function(e){
    console.info(e.target.id);

    updateGame(e.target); 

})

document.querySelector("#reset_btn").addEventListener('click', function(e)
{

})

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

document.getElementById('gameOver_modal').addEventListener('shown.bs.modal', function () {
  
})