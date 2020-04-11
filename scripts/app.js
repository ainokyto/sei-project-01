function init() {
  // * DOM ELEMENTS ----------------------------------------------------------

  const startBtn = document.querySelector('.start')

  // * GAME VARIABLES ------------------------------------------------------
  let direction = 1
  const grid = document.querySelector('.grid')
  const cells = []
  const width = 11
  const cellCount = width * width

  //* // * START GAME --------------------------------------------------------

  function gameInit() {

    // * CREATE GRID AND PLAYER SPACESHIP-------------------------------------

    let playerPosition = 115
    function createGrid(startingPosition) {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.textContent = i
        grid.appendChild(cell)
        cells.push(cell)
      }
      cells[startingPosition].classList.add('spaceship')
    }

    // * CREATE INVADERS -----------------------------------------------------
    let invaderArray = [0, 1, 2, 3, 4, 5, 6, 7, 
      11, 12, 13, 14, 15, 16, 17, 18, 
      22, 23, 24, 25, 26, 27, 28, 29]

    function createInvaders() {
      invaderArray.forEach(invader =>
        cells[invader].classList.add('invaders'))
    }
    //* INVADER MOVEMENT ------------------------------------------------------
    // in the if statement, -1 moves left, width down

    //* game starts with invaders moving right
    //* function removeAliens - remove classes
    //* function addAliens - based on the direction variable


    setInterval(function moveInvaders() {
      removeInvaders() 
      if (invaderArray[0] % width === 3 && direction === 1) {
        direction = width
      } else if (invaderArray[0] % width === 3 && direction === width) {
        direction = -1
      } else if (invaderArray[0] % width === 0 && direction === -1 ) {
        direction = width
      } else if (invaderArray[0] % width === 0 && direction === width) {
        direction = 1
      // } else if (invaderArray[0] > width * width - width) {
      //   gameOver()
      }
      addInvaders()
    }, 300)

    //* REMOVE INVADERS CLASS --------------------------------------------------
    function removeInvaders () {
      invaderArray.forEach(invader =>
        cells[invader].classList.remove('invaders'))
    }

    //* ADD INVADERS CLASS ------------------------------------------------------
    function addInvaders() {
      invaderArray = invaderArray.map(a => a + direction)
      invaderArray.forEach(invader => {
        cells[invader].classList.add('invaders')
      })
    }

    //* PLAYER SPACESHIP MOVEMENT ---------------------------------------------

    function handleKeyDown(event) {
      cells[playerPosition].classList.remove('spaceship')
      switch (event.keyCode) {
        case 39:
          playerPosition < 120 ? playerPosition++ : playerPosition
          break
        case 37:
          playerPosition > 110 ? playerPosition-- : playerPosition
          break
        default:
          playerPosition
      }
      cells[playerPosition].classList.add('spaceship')
    }

    createGrid(playerPosition)
    createInvaders()
    document.addEventListener('keydown', handleKeyDown)
    
  }
  
  function handleStartBtn() {
    gameInit()
    startBtn.disabled = true // Try to look for a way to hide button after click!
    //* start a timer and store in a variable
  }
  
  //* EVENT LISTENERS
  
  
  startBtn.addEventListener('click', handleStartBtn)
  
}

window.addEventListener('DOMContentLoaded', init)