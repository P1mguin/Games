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
    let row = rows[rowIndex];
    let numbers = [];
    for (let i = 0; i < 9; i++) {
        // parse an int from every cell and store them in an array
        numbers.push(parseInt(row.querySelector(`:nth-child(${i + 1})`).innerText));
    }
    // Compare the sorted arrays, if correct this should be the same as nums
    return JSON.stringify(numbers.sort()) === JSON.stringify(nums);
}

function checkVertical(colIndex){
    let numbers = [];
    for (let i = 0; i < 9; i++) {
        numbers.push(parseInt(document.querySelector(`tr:nth-child(${i + 1}`).querySelector(`:nth-child(${colIndex + 1}`).innerText));
    }
    return JSON.stringify(numbers.sort()) === JSON.stringify(nums);
}
