//functions
//---------

function resizeAppContainer(){

    // change div padding

    // change containe width
    let appContainer = document.querySelector("#app_container")
    if(window.innerWidth >= 1400) // xxl and above
    {
        // appContainer.classList.add("w-50");
        // appContainer.classList.remove("w-50");
    }
    if(window.innerWidth > 768 && window.innerWidth < 1400) // medium to xl
    {
        appContainer.classList.remove("w-25");
        appContainer.classList.add("w-50");
        appContainer.classList.remove("w-75");

    }
    else if(window.innerWidth >= 576 && window.innerWidth <= 768) // small
    {
        appContainer.classList.remove("w-50");
        appContainer.classList.add("w-75");
        appContainer.classList.remove("w-100");
    }
    else if(window.innerWidth < 576)    // extra small
    {
        appContainer.classList.remove("w-75");
        appContainer.classList.add("w-100");
    }

    // resize game board divs to be square
    let squares = document.querySelectorAll(".boxx"); 
    let squareHeight = parseInt(squares[0].offsetWidth) + "px";
    for(let square of squares){
        console.log(squareHeight);
        square.style.height = squareHeight;
        // square.style.height = 50 + "px";
    }
}


// event listeners
//----------------

window.addEventListener('resize', resizeAppContainer);
window.addEventListener('load', resizeAppContainer);
