//variable declarations

var grid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var puzzleArea;
var shuffleButton;
var shuffling = true;

window.onload = function() { //initiating function
    //attach event handlers
    puzzleArea = document.getElementById("puzzlearea");
    puzzleArea.style.width = "400px";
    puzzleArea.style.height = "400px";
    shuffleButton = document.getElementById("shufflebutton");
    shuffleButton.onclick = shuffleButtonClicked;
    shuffleButtonClicked();
};


function shuffleButtonClicked(dontReset) {
    //if puzzlearea already has children, remove them
    while (puzzleArea.hasChildNodes()) {
        puzzleArea.removeChild(puzzleArea.lastChild);
    }

    //shuffle and create the grid
    if (shuffling) {
         grid = shuffle(grid);
    }

    for (var i = 0; i < grid.length; i++) {
        addSquare(grid[i]);
    }



}


function addSquare(number) {
    var square = document.createElement("div");
    square.className = "square";
    square.style.border = "1px solid black";
    square.style.height = "95px";
    square.style.width = "95px";
    square.style.color = "blue";
    square.innerHTML = number; //this will associate the node with its value in the grid 
    square.style.fontSize = "40pt";
    square.onclick = squareClicked;
    square.onmouseover = squareHoveredOver;
    square.onmouseout = squareHoveredOut;
    square.style.clear = "left";
    square.style.float = "right";





    if (number != 0) { //set each square to the correct corner of an image!
        var url = "url('http://www.guidelive.com/resources/motif/images/header-mad-libs/doing/anything_400x400.jpg')";
        square.style.backgroundImage = url;

        if ((number + 1) % 4 == 0) {
            square.style.backgroundPosition = "0px -" + (number - 3) / 4 + "00px";
        }
        else if((number+2) % 4 == 0) {
            square.style.backgroundPosition = "-100px -" + (number - 2) / 4 + "00px";
        }else if((number+3) % 4 == 0) {
            square.style.backgroundPosition = "-200px -" + (number - 1) / 4 + "00px";
        }else if((number+4) % 4 == 0) {
            square.style.backgroundPosition = "-300px -" + (number) / 4 + "00px";
        }




    }
















    puzzleArea.appendChild(square);
}

function squareClicked() {
    shuffling = false;
    var number = this.innerHTML;
    if (thisNumberIsAdjacentToZero(number)) {
        move(number);
    }
    shuffling = true;
}



function move(numberIndex, zeroIndex) {
    //MAKE THAT MOVE
    //alert("shit just got moved");
    grid[zeroIndex] = grid[numberIndex];
    grid[numberIndex] = 0;
    shuffleButtonClicked(true);
}






function squareHoveredOver() {
    if (this.innerHTML != "0")
        this.style.color = "green";
}

function squareHoveredOut() {
    this.style.color = "blue";
}






//verified to work
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//this function looks at the array and compares that number to where the 0 is
//and calls the move function if the user has clicked 
function thisNumberIsAdjacentToZero(number) {
    var numberIndex;
    var zeroIndex;

    //get the index of the array
    for (var i = 0; i < grid.length; i++) {
        if (grid[i] == number) {
            numberIndex = i; //the index in the array that contains that value
        }

        if (grid[i] == 0) {
            zeroIndex = i;
        }

    }
    //get the index of the array


    //alert("Number index: " + numberIndex + " Zero Index: " + zeroIndex);

    if (zeroIndex == numberIndex) //if the person clicked the zero dont do anything!!!!
        return;


    if ((zeroIndex + 4) == numberIndex || (zeroIndex - 4) == numberIndex) { //if it's above or below
        move(numberIndex, zeroIndex);
        return;
    }


    if (zeroIndex == 3 || zeroIndex == 7 || zeroIndex == 11 || zeroIndex == 15) { //if it's on the end line(right side)
        if ((zeroIndex - 1) == numberIndex) {
            //alert("it's on a side");
            move(numberIndex, zeroIndex);
            return;
        }
    }


    if (zeroIndex == 0 || zeroIndex == 4 || zeroIndex == 8 || zeroIndex == 12) {
        if (zeroIndex + 1 == numberIndex) {
            move(numberIndex, zeroIndex);
            return;
        }
    }

    if (zeroIndex + 1 == numberIndex) {
        move(numberIndex, zeroIndex);
        return;
    }
    if ((zeroIndex - 1) == numberIndex) {
        move(numberIndex, zeroIndex);
        return;
    }
}
