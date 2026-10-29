
// פונקציה שבודקת שלא קיים מספר כזה באותה שורה / עמודה / ריבוע

function CheckTruePlace(num, r, c) {
   //בודק אם המספר קיים בטור
   for (let i = 0; i < cols; i++)
      if (board[i][c] == num)
         return false

   //בודק אם המספר קיים בשורה
   for (let i = 0; i < row; i++)
      if (board[r][i] == num)
         return false

   //בודק אם המספר קיים באותו ריבוע
   let startRow = Math.floor(r / 3) * 3
   let startCol = Math.floor(c / 3) * 3

   for (let i = startRow; i < startRow + 3; i++)
      for (let j = startCol; j < startCol + 3; j++)
         if (board[i][j] == num && (i != r || j != c))
            return false
   return true
}

//פונקציה שמוצאת את התא הריק הבא
function nextEmpty() {
  for (let i = 0; i < board.length; i++) {
       let j = board[i].findIndex(cell => cell == -1)
    if (j !== -1) 
      return [i, j]
  }
  return null
}
//פונקציה שמנסה להכניס מספר לתא
function TryToPutNum(x, y) {
   MixArry(numsToTry)
   for (let i = 0; i < numsToTry.length; i++) {
      if (CheckTruePlace(numsToTry[i], x, y)) {
         board[x][y] = numsToTry[i]
         return true
      }
   }
   return false
}

//פונקציה שמערבבת את סדר המערך
function MixArry(arr) {
   let temp
   for (let i = arr.length - 1; i > 0; i--) {
      let RandArr = Math.floor(Math.random() * (i + 1))
      temp = arr[i]
      arr[i] = arr[RandArr]
      arr[RandArr] = temp
   }
   return arr
}

//פונקציה שבונה את לוח הסודוקו
function buildBord() {
   let index = nextEmpty()
   if (index == null)
      return true

   let r = index[0]
   let c = index[1]

   if (TryToPutNum(r, c)) {
      if (buildBord())
         return true
   }
   board[r][c] = -1
   return false
}

// פונקציה שסופרת מספר פתרונות של הלוח כדי למחוק
function countSolutions() {
   let nextIndex = nextEmpty()
   if (nextIndex == null)
      return 1

   let r = nextIndex[0]
   let c = nextIndex[1]
   let count = 0
   for (let i = 1; i <= 9; i++) {
      if (CheckTruePlace(i, r, c)) {
         board[r][c] = i
         count += countSolutions()

         if (count > 1) {
            board[r][c] = -1
            return count
         }
         board[r][c] = -1
      }
   }
   return count
}

// פונקציה שמוחקת מספרים מהמטריצה
function DeleteNums(countDelete) {
   let countNumDelete = 0
   let saveNum = 0
   while (countNumDelete < countDelete) {
      let x = Math.floor(Math.random() * 9)
      let y = Math.floor(Math.random() * 9)

      if (board[x][y] != -1) {
         saveNum = board[x][y]
         board[x][y] = -1
      }
      if (countSolutions() == 1) {
         countNumDelete++
         numOpen[x][y] = false
      }
      else
         board[x][y] = saveNum
   }
}
// function getCandidates(board, row, col) {
//   let candidates = []
//   for (let num = 1; num <= 9; num++) {
//     if (CheckTruePlace(num, row, col)) {
//       candidates.push(num)
//     }
//   }
//   return candidates
// }
// 
// 
// function countSingles(board) {
//   let count = 0
//   for (let r = 0; r < 9; r++) {
//     for (let c = 0; c < 9; c++) {
//       if (board[r][c] === -1) {
//         let candidates = getCandidates(board, r, c)
//         if (candidates.length === 1) {
//           count++
//         }
//       }
//     }
//   }
//   return count
// }


//פונקציה שמוחקת מספרים מהמטריצה
// function DeleteNums( level,countDelete) {
//    let attempts = 0
//    let countNumDelete = 0
//    let saveNum = 0
//    while (countNumDelete < countDelete) {
//       let x = Math.floor(Math.random() * 9)
//       let y = Math.floor(Math.random() * 9)
// 
//       if (board[x][y] != -1) {
//          saveNum = board[x][y]
//          board[x][y] = -1
//       }
//       if (countSolutions(board) == 1 && countSingles<4 &&  attempts<1000)
//       {
//          attempts++
//          countNumDelete++
//          numOpen[x][y] = false
//       }
//       else
//          board[x][y] = saveNum
//    }
// }

//פונקציה שמסמנת את התאים הגלוייים בצבע שונה
function changeColor() {
   for (let i = 0; i < cols; i++) {
      for (let j = 0; j < row; j++) {
         if (numOpen[i][j]) {
            document.getElementById(`cell-${i}-${j}`).style.backgroundColor = "#f21717ff"

         }
      }
   }
}


//פונקציה שמאפסת את הלוח חזרה לתחילת המשחק
function baginAgen() {
   for (let i = 0; i < cols; i++) {
      for (let j = 0; j < row; j++) {
         if (!numOpen[i][j]) {
            board[i][j] = -1
            document.getElementById(`cell-${i}-${j}`).value = ""
         }
      }
   }

}
function checkBoard(boardFull) {
   // בדיקה אם הלוח מלא
   function checkBoardFull() {
      for (let i = 0; i < cols; i++) {
         for (let j = 0; j < row; j++) {
            if (board[i][j] == -1) return false;
         }
      }
      return true;
   }

   // בדיקה אם הפתרון נכון
   function checkTrueSolution() {
      for (let i = 0; i < cols; i++) {
         for (let j = 0; j < row; j++) {
            if (board[i][j] != boardFull[i][j]) return false;
         }
      }
      return true;
   }

   if (!checkBoardFull()) {
      alert("הלוח עדיין לא מלא 😅");
      return;
   }

   if (checkTrueSolution()) {
      alert("כל הכבוד! ניצחת 🥳🎉🎊");
   } else {
      alert("אופסס..., יש טעות בלוח😢");
   }
}

//פונקציה שממלאת את הדיב במספרים לפי המטריצה וצובעת תאים קבועים
function fillDiv() {
   allInputs = document.querySelectorAll('.squresInput')
   for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
         let index = i * 9 + j;
         allInputs[index].value = board[i][j] !== -1 ? board[i][j] : ""
         //אם התא הוא קבוע
         if (board[i][j] !== -1) {
            allInputs[index].disabled = true // לא ניתן לשנות
            allInputs[index].style.backgroundColor = "#e1e8e9ff"
         }
      }
   }
}
// פונקציה שמאפסת את תיבת הטקסט שלא תיהיה קבועה לפהי משחק חדש
function resetInputs() {
   let allInputs = document.querySelectorAll('.squresInput')
   allInputs.forEach(input => {
      input.value = ""
      input.disabled = false
      input.style.backgroundColor = "white"
   })
}

function sudokuGame() {
   while (!buildBord()) {
      for (let i = 0; i < cols; i++)
         for (let j = 0; j < row; j++)
            board[i][j] = -1
   }
   buildBord()  // בונה לוח מלא
   //מעתיק את הלוח ללוח חדש כדי לשמור אותו לפני שמוחקים
   for (let i = 0; i < cols; i++) {
      for (let j = 0; j < row; j++) {
         boardFull[i][j] = board[i][j]
      }
   }
   DeleteNums( 50)  // מוחק מספרים מהלוח
   fillDiv()  //ממלא את הלוח - הדיב במטריצה 

}
//פונקציה של רמז
function tip() {
   let num
   let arrEmpty = []

   // מוצא את כל התאים הריקים
   for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
         if (board[i][j] == -1)
            arrEmpty.push([i, j])
      }
   }

   if (arrEmpty.length == 0)
      return board

   // בודק עבור כל תא ריק אם יש לו מספר יחיד חוקי
   for (let i = 0; i < arrEmpty.length; i++) {
      let [r, c] = arrEmpty[i]
      let count = 0

      for (let j = 1; j <= 9; j++) {
         if (CheckTruePlace(j, r, c)) {
            count++
            num = j
         }
      }

      if (count == 1) {
         // יש רק מספר אחד חוקי- זה הרמז
         board[r][c] = num
         let cell = document.getElementById(`cell-${r}-${c}`)
         cell.value = num
         cell.style.backgroundColor = "#c3e8f1ff"

         setTimeout(() => {
            cell.style.backgroundColor = "white"
         }, 1500)
         return board
      }
   }
}



sudokuGame()
//לייעל את הלולאות בפונקציה הראשונה
//לעשות שלבים יותר קשים- לדעת מה למחוק


