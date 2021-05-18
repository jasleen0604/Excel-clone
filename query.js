let addbtnContainer = document.querySelector(".add-sheet-container");
let sheetList = document.querySelector(".sheets-list");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let alignmentButtons = document.querySelectorAll(".alignment-container input");
let fontBtn = document.querySelector(".font-size");
let BUIButtons = document.querySelectorAll(".BUI_container input");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let fontFamilyButton = document.querySelector(".font-family");
let cellTextColor = document.querySelector(".color-container #color");
let cellBgColor = document.querySelector(".color-container #bg-color");

let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", handleActiveSheet)

//adding sheets in excel

addbtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 2}`;
    sheetList.appendChild(newSheet);
    newSheet.addEventListener("click", handleActiveSheet);
})
//handling the current sheet

function handleActiveSheet(e) {
    let mySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!mySheet.classList[1]) {
        mySheet.classList.add("active-sheet");
    }
}

//adding the address of current block in the address bar

for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;

        // let cellObject = sheetDB[rid][cid];

        // if(cellObject.bold == true)
        // boldElem.classList.add("active-btn");

    });
}
Allcells[0].click();

//extracting row id and col id from address of the block

function getRidCidFromAdress(address) {
    let cellcolAdr = address.charCodeAt(0);
    let cellrowAdr = address.slice(1);
    let cid = cellcolAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { rid, cid };

}
//**************************formatting of sheets*********************** */

//aligning the text in the blocks

for (let i = 0; i < alignmentButtons.length; i++) {
    alignmentButtons[i].addEventListener("click", function () {
        let alignment = alignmentButtons[i].value;
        // alert(alignment);
        let address = addressBar.value;
        let { rid, cid } = getRidCidFromAdress(address);
        let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);

        if (alignment == "L")
            cell.style.textAlign = "left";
        if (alignment == "C")
            cell.style.textAlign = "center";
        if (alignment == "R")
            cell.style.textAlign = "right";
    })
}
//changing font size of text in the blocks

fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAdress(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    cell.style.fontSize = fontSize + "px";
})

// BUI styling 

for (let i = 0; i < BUIButtons.length; i++) {
    BUIButtons[i].addEventListener("click", function () {
        let bui = BUIButtons[i].value;
        // alert(bui);
        let address = addressBar.value;
        let { rid, cid } = getRidCidFromAdress(address);
        let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);

        if (bui == "B") {
            if(boldElem.classList.contains("active-btn"))
            {
                boldElem.classList.remove("active-btn");
                cell.style.fontWeight = "normal";
                sheetDB[rid,cid].bold = false;
            }
            else{
                boldElem.classList.add("active-btn");
                cell.style.fontWeight = "bold";
                sheetDB[rid,cid].bold = true;
            }
            
        }
        if (bui == "U") {
            if(underlineElem.classList.contains("active-btn"))
            {
                underlineElem.classList.remove("active-btn");
                cell.style.textDecoration = "none";
                sheetDB[rid,cid].underline = "none";
            }
            else{
                underlineElem.classList.add("active-btn");
                cell.style.textDecoration = "underline";
                sheetDB[rid,cid].underline = "underline";
            }   
        }

        if (bui == "I") {
            if(italicElem.classList.contains("active-btn"))
            {
                italicElem.classList.remove("active-btn");
                cell.style.fontStyle = "normal";
                sheetDB[rid,cid].italic = "normal";
            }
            else{
                italicElem.classList.add("active-btn");
                cell.style.fontStyle = "italic";
                sheetDB[rid,cid].italic = "italic"; 
            }
        }
        console.log(sheetDB);
    })
    
}

//font family

fontFamilyButton.addEventListener("change", function () {
    let currFontFamily = fontFamilyButton.value;

    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAdress(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    cell.style.fontFamily = currFontFamily;
})

//text and bg color of cell

cellTextColor.addEventListener("change", function (e) {
    let currColor = cellTextColor.value;
    //console.log(currColor);
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAdress(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    cell.style.color = currColor;
})
cellBgColor.addEventListener("change", function(){
    let currBgColor = cellBgColor.value;

    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAdress(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    cell.style.backgroundColor = currBgColor;
})
