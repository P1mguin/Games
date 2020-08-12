var table = document.querySelector("table");
var rows = [
    document.querySelector("tr:nth-child(1)"),
    document.querySelector("tr:nth-child(2)"),
    document.querySelector("tr:nth-child(3)"),
    document.querySelector("tr:nth-child(4)"),
    document.querySelector("tr:nth-child(5)"),
    document.querySelector("tr:nth-child(6)"),
    document.querySelector("tr:nth-child(7)"),
    document.querySelector("tr:nth-child(8)"),
    document.querySelector("tr:nth-child(9)"),
    ]
const nums = [1,2,3,4,5,6,7,8,9]

// The rules ---------------------------------------------------------------------

// Horizontal line
// Rows are horizontally indexed from left to right, most left is 0 most right is 8
// Rows are vertically indexed from top to bottom, topmost is 0 most bottom is 8
function checkHorizontal(rowIndex){
    // Compare the sorted arrays, if correct this should be the same as nums
    return JSON.stringify(getRow(rowIndex).sort()) === JSON.stringify(nums);
}

function checkVertical(colIndex){
    return JSON.stringify(getColumn(colIndex).sort()) === JSON.stringify(nums);
}

// Blocks are indexed like the rows and columns so top left is 0,0 and bottom right is 2,2
function checkBlock(rowIndex, colIndex){
    return JSON.stringify(getBlock(rowIndex, colIndex).sort()) === JSON.stringify(nums);
}

function check(){
    for (let i = 0; i < 9; i++) {
        if(!checkHorizontal(i)){
            alert(`Not correct, failed on row ${i}`)
            return false;
        }
        if(!checkVertical(i)){
            alert(`Not correct, failed on column ${i}`)
            return false;
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(!checkBlock(i, j)){
                alert(`Not correct, failed on block ${i}, ${j}`);
                return false;
            }
        }
    }
    alert("Correct");
    return true;
}

function solve(){
    // Create an index of the already filled in numbers, those may not be violated
    let numbers = getOccupied();
    while(!check()){
        // Check whether the board is filled
        let filled = getOccupied().length === 81;
        // If we are filled we need to backtrack
        if(filled){

        } else { // Just try something

        }
    }
}

function checkSafe(guess, rowIndex, colIndex){
    // Check whether the number is not yet in that row and column
    return !(getRow(rowIndex).includes(guess) || getColumn(colIndex).includes(guess) || getBlock(Math.floor(rowIndex / 3), Math.floor(colIndex / 3)).includes(guess));
}

function getOccupied(){
    let numbers = [];
    // Vertical loop - y
    for (let i = 0; i < rows.length; i++) {
        // Horizontal loop - x
        for (let j = 0; j < 9; j++) {
            let number = parseInt(rows[i].querySelector(`:nth-child(${j + 1})`).innerText)
            if(Number.isInteger(number)){
                numbers.push({
                    x: j, y: i
                });
            }
        }
    }
    return numbers;
}

function getRow(rowIndex){
    let row = rows[rowIndex];
    let numbers = [];
    for (let i = 0; i < 9; i++) {
        numbers.push(parseInt(row.querySelector(`:nth-child(${i + 1})`).innerText));
    }
    return numbers;
}

function getColumn(colIndex){
    let numbers = [];
    for (let i = 0; i < 9; i++) {
        numbers.push(parseInt(document.querySelector(`tr:nth-child(${i + 1}`).querySelector(`:nth-child(${colIndex + 1}`).innerText));
    }
    return numbers;
}

function getBlock(rowIndex, colIndex){
    let first = rows[rowIndex * 3];
    let second = rows[rowIndex * 3 + 1];
    let third = rows[rowIndex * 3 + 2];
    let numbers = [];
    for (let i = colIndex * 3; i < colIndex * 3 + 3; i++) {
        numbers.push(parseInt(first.querySelector(`:nth-child(${i + 1})`).innerText));
        numbers.push(parseInt(second.querySelector(`:nth-child(${i + 1})`).innerText));
        numbers.push(parseInt(third.querySelector(`:nth-child(${i + 1})`).innerText));
    }
    return numbers;
}


