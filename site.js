const X_CLASS = 'x'
const O_CLASS = 'o'

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const cellElem = document.querySelectorAll('[data-cell')
const board = document.getElementById('board')
const winWindow = document.getElementById('winMessage')
const winText = document.querySelector('[data-win-text]')
const restart = document.getElementById('restartBtn')

let nextTurn

startGame()

restart.addEventListener('click', startGame)

function startGame() {
  restartGame()
  nextTurn = false
  cellElem.forEach(cell => {
    cell.addEventListener(
      'click',
      handleClick,
      { once: true })
  })
  setHover()
}

function restartGame() {
  cellElem.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
  })
  winWindow.classList.remove('show')
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurn() {
  nextTurn = !nextTurn
}

function setHover() {
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  if (nextTurn) {
    board.classList.add(O_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WIN_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElem[index].classList.contains(currentClass)
    })
  })
}

function isDraw() {
  return [...cellElem].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}

function endGame(draw) {
  if (draw) {
    winText.innerText = 'Draw!'
  } else {
    winText.innerText = `${nextTurn ? "O's" : "X's"} Wins!`
  }
  winWindow.classList.add('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = nextTurn ? O_CLASS : X_CLASS
  placeMark(cell, currentClass)

  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurn()
    setHover()
  }
}