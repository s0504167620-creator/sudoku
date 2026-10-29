
let cols=9
let row=9
//מטריצה - לוח המשחק
let board=[]
for (let i = 0; i < cols; i++) {
    board.push([])
    for (let j = 0; j < row; j++) {
        board[i].push(-1)
    }
}
console.log(board)

//לוח מלא לשמור כדי לבדוק פתרון
let boardFull=[]
for (let i = 0; i < cols; i++) {
    boardFull.push([])
    for (let j = 0; j < row; j++) {
        boardFull[i].push(-1)
    }
}
console.log(boardFull)

//מטריצה נוספת שמסמת האם התא גלוי בהתחלה
let numOpen=[]
for (let i = 0; i < cols; i++) {
    numOpen.push([])
    for (let j = 0; j < row; j++) {
        numOpen[i].push(true)
    }
}
console.log(numOpen)

let countSolution=0 //מספר האפשרויות לפתרון של הלוח
let numsToTry = [1,2,3,4,5,6,7,8,9] //המספרים שהוא ינסה לשים בתא במקום להגריל שוב
let allInputs //כל התיבות טקסט שעם אותו קלאס
let countTip=3 //מספר הרמזים
let level=0 // כדי לדעת את רמת המשחק