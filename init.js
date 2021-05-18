
// grid container
let topRow = document.querySelector(".top-row"); // A - Z row
let str = "";
for (let i = 0; i < 26; i++) {
    str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`; //forming div for each letter from A-Z
}
topRow.innerHTML = str;

let leftCol = document.querySelector(".left-col"); // 1 - 100 cols
str = ""
for (let i = 0; i < 100; i++) {
    str += `<div class='left-col_box'>${i + 1}</div>`;  //forming div for each vertical col from 1-100
}
leftCol.innerHTML = str;

// 2d array grid

let grid = document.querySelector(".grid");
str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class="row">`
    for (let j = 0; j < 26; j++) {
        str += `<div class='col' rid=${i} cid=${j} contentEditable = "true" ></div>`
    }
    str += "</div>";
}
grid.innerHTML = str;

let sheetDB = [];
for(let i=0; i<100; i++)
{
    let row = [];
    for(let j=0; j<26; j++)
    {
        let cell={
            bold: false,
            italic: "normal",
            underline: "none",
            fontFamily: "Arial", 
            fontSize: "10",
            halign: "left"
        }
        row.push(cell);
    }
    sheetDB.push(row);
}
// console.log(sheetDB);