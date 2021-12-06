
// 
const PlayerEnum = {
    "none" : 0,
    "one": 1, 
    "two": 2, 
}

let boardArr = []

let activePlayer = PlayerEnum.one; 


//
function setBoardSquare (target){

    if(!target.classList.contains("active")){
        console.warn("Space has already been selected. Please select an open space.");
        return false;
    }

    if(activePlayer == PlayerEnum.one){
        target.textContent = "X"; 
        activePlayer = PlayerEnum.two;
    }else{ 
        target.textContent = "O"; 
        activePlayer = PlayerEnum.one;
    }

    target.classList.remove("active");
    return true;
}

function parseSpace(target){

    switch(target.id)
    {
    case "square_1": 
        return 1;
    case "square_2": 
        return 2;
    case "square_3": 
        return 3;
    case "square_4": 
        return 4;
    case "square_5": 
        return 5;
    case "square_6": 
        return 6;
    case "square_7": 
        return 7;
    case "square_8": 
        return 8;
    case "square_9": 
        return 9;
    }
}



// event selector
document.querySelector("#border_container").addEventListener('click', function(e){
    console.info(e.target.id);

    setBoardSquare(e.target); 

})