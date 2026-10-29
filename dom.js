
//let chooseDiv = document.createElement("div");
//chooseDiv.id = "chooseDifficulty";
//document.body.appendChild(chooseDiv);
//
//chooseDiv.appendChild(createDifficultyButton("קל", 0))
//chooseDiv.appendChild(createDifficultyButton("בינוני", 1))
//chooseDiv.appendChild(createDifficultyButton("קשה", 2))
//לוח הסודוקו
let boardGame = document.createElement("div")
boardGame.id = "sudoku-board"
document.body.appendChild(boardGame)

//לולאה ליצירת הריבועים בתוך הלוח
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    // יוצר את הדיב
    let squres = document.createElement("div")
    squres.classList.add("squres")

    //בודק את המיקום של הריבוע כדי לסמן את הריבועים הגדולים
    if ((i + 1) % 3 == 0 && i < 8) {
      squres.style.borderBottom = "3px solid black"
    }
    if ((j + 1) % 3 == 0 && j < 8) {
      squres.style.borderRight = "3px solid black"
    }
    //יוצר תיבת טקסט בתוך הדיב הקטן
    let squresInput = document.createElement("input")
    squresInput.type = "text"
    squresInput.maxLength = "1"
    squresInput.id = `cell-${i}-${j}`
    squresInput.classList.add("squresInput")
    squresInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^1-9]/g, "")
    })


    squres.appendChild(squresInput)
    boardGame.appendChild(squres)
  }
}
//ממלא את הלוח - הדיב במטריצה 
fillDiv()

//מעדכן את הלוח כשהמשתמש מכניס מספר או מוחק
allInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    let i = Math.floor(index / 9)
    let j = index % 9
    board[i][j] = input.value ? parseInt(input.value) : -1
  })
})

// עבור על כל התאים במטריצה
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    // חשב את האינדקס של האלמנט
    let index = (i * 9) + j

    // אם הערך במטריצה אינו -1, עדכן את תיבת הטקסט
    if (board[i][j] !== -1) {
      allInputs[index].value = board[i][j]
    }
  }
}


//דיב של כל הכפתורים
let divButtons = document.createElement("div")
divButtons.classList.add("div_Buttons")
document.body.appendChild(divButtons)

//כפתור של איזה רמה
//קשה
// let hardLevelBotton = document.createElement("button")
// hardLevelBotton.textContent = " קשה"
// hardLevelBotton.classList.add("buttons")
// divButtons.appendChild(hardLevelBotton)
// hardLevelBotton.addEventListener("click", () => {
//   level=2
// })
// 
// //בינוני
// let BenoniLevelBotton = document.createElement("button")
// BenoniLevelBotton.textContent = " בינוני"
// BenoniLevelBotton.classList.add("buttons")
// divButtons.appendChild(BenoniLevelBotton)
// BenoniLevelBotton.addEventListener("click", () => {
//   level=1
// })
// 
// //קל
// let EziLevelBotton = document.createElement("button")
// EziLevelBotton.textContent = "קל"
// EziLevelBotton.classList.add("buttons")
// divButtons.appendChild(EziLevelBotton)
// EziLevelBotton.addEventListener("click", () => {
// })

//כפתור - איפוס לוח-חזרה לתחילת המשחק
let ResetBotton = document.createElement("button")
ResetBotton.textContent = "איפוס לוח"
ResetBotton.classList.add("buttons")
divButtons.appendChild(ResetBotton)
ResetBotton.addEventListener("click", () => {
    countTip=3
  baginAgen()
})

//כפתור - משחק חדש
let BottonNewGame = document.createElement("button")
BottonNewGame.textContent = "משחק חדש"
BottonNewGame.classList.add("buttons")
divButtons.appendChild(BottonNewGame)
//מאזין לאירוע- שלוחצים על כפתור משחק חדש
BottonNewGame.addEventListener("click", () => {
  //מאפס את כל המטריצות  
  countTip=3
  board = Array.from({ length: 9 }, () => Array(9).fill(-1))
  boardFull = Array.from({ length: 9 }, () => Array(9).fill(-1))
  numOpen = Array.from({ length: 9 }, () => Array(9).fill(true))
  //מאפס את תיבת הטקסט שלא תיהיה קבועה
  resetInputs()
  //קוראים לפונקציה שתבנה את הסודוקו שוב
  sudokuGame()
})


//כפתור -  סיום משחק
let BottonFinishGame = document.createElement("button")
BottonFinishGame.textContent = " סיום"
BottonFinishGame.classList.add("buttons")
divButtons.appendChild(BottonFinishGame)
BottonFinishGame.addEventListener("click", () => {
  console.log(board);
  checkBoard(boardFull, board)
})


//כפתור - רמז
let tipBotton = document.createElement("button")
tipBotton.textContent = " רמז"
tipBotton.classList.add("buttons")
divButtons.appendChild(tipBotton)
tipBotton.addEventListener("click", () => {
  if(countTip-->0)
  tip(board)
  else
     alert("נגמרו הרמזים")

   
})
