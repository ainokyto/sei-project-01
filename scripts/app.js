function init() {
  // * DOM ELEMENTS ----------------------------------------------------------

  const startBtn = document.querySelector('.start')
  const resetBtn = document.querySelector('.reset')
  const scoreTally = document.querySelector('.actualscore')

  // * GAME VARIABLES ------------------------------------------------------

  const grid = document.querySelector('.grid')
  const width = 11
  const cellCount = width * width
  let cells = []
  let score = 0
  let direction = 1
  let gameRunning = false
  let invaderArray = [0, 1, 2, 3, 4, 5, 6, 7,
    11, 12, 13, 14, 15, 16, 17, 18,
    22, 23, 24, 25, 26, 27, 28, 29]
  let playerPosition = 115
  let timerId = null
  let enemyFireTimerId = null
  let firstRowTimerId = null
  let laserTimerId = null


  //* // * START GAME --------------------------------------------------------

  function gameInit() {

    createGrid(playerPosition)
    createInvaders()
    startTimer()
    firstRowTimer()

    //* START ENEMY LASER TIMER --------------------------------------------------------
    function firstRowTimer() {
      console.log('enemy laser shoot')
      firstRowTimerId = setInterval(checkFirstRow, 1000)
    }

    // * CREATE GRID AND PLAYER SPACESHIP -------------------------------------

    function createGrid(startingPosition) {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.textContent = i
        grid.appendChild(cell)
        cells.push(cell)
      }
      cells[startingPosition].classList.add('spaceship')
    }
    // * CREATE INVADERS ON GRID ----------------------------------------------

    function createInvaders() {
      invaderArray.forEach(invader =>
        cells[invader].classList.add('invaders'))
    }
    //* INVADER MOVEMENT ------------------------------------------------------
    // in the if statement, direction moves right, -1 moves left, width moves down

    // game starts with invaders moving right
    // when Invader Zero hits index 3 the move width down to 14
    // function removeInvaderss - remove classes
    // function addInvaders - based on the direction(1) variable

    function moveInvaders() {
      removeInvaders()
      if (invaderArray[0] > width * width - width) { // when the first invader hits cell index 111 
        gameOver()
      } else if (invaderArray[0] % width === 3 && direction === 1) {
        direction = width
      } else if (invaderArray[0] % width === 3 && direction === width) {
        direction = -1
      } else if (invaderArray[0] % width === 0 && direction === -1) {
        direction = width
      } else if (invaderArray[0] % width === 0 && direction === width) {
        direction = 1
      }
      addInvaders()
    }

    //* REMOVE INVADERS CLASS --------------------------------------------------
    function removeInvaders() {
      invaderArray.forEach(invader =>
        cells[invader].classList.remove('invaders'))
    }

    //* ADD INVADERS CLASS ------------------------------------------------------
    function addInvaders() { // draws the invaders back on their new position on the grid
      invaderArray = invaderArray.map(a => a + direction)
      invaderArray.forEach(invader => {
        cells[invader].classList.add('invaders')
      })
    }

    //* START GAME TIMER ------------------------------------------------------

    function startTimer() { // stop gameInit from starting multiple instances of the timer 
      // create a global variable for gameRunning and give it the value Boolean false
      // create a global variable for timer and give it the value 'null'
      if (!gameRunning) {  // make an if statement where if gameRunning = true, 
        timerId = setInterval(moveInvaders, 1000) //timerId is assigned the value of a timer starting moving invaders, 
        gameRunning = true // and gameRunning = true
      } else { // if gameRunning is false, timer will not start
        gameRunning = false
      }
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
        case 38:
          fireLaser()
          break
        default:
          playerPosition
      }
      cells[playerPosition].classList.add('spaceship')
    }

    //* FIRE AT INVADERS ----------------------------------------------------------------

    function fireLaser() {
      let laserIndex = playerPosition - width // laser starts at cell directly above player
      cells[laserIndex].classList.add('laser')
      laserTimerId = setInterval(laserAdvance, 75)


      //* MAKE LASER ADVANCE ACROSS THE GRID ------------------------------------------------------

      function laserAdvance() {
        cells[laserIndex].classList.remove('laser') // remove laser class
        if (laserIndex > width - 1) { // stops at the grid
          laserIndex = laserIndex - width // finding the cell directly above curren laserindex
          cells[laserIndex].classList.add('laser') // add class to new square

          //* COLLISION DETECTION
          if (cells[laserIndex].classList.contains('invaders')) { // If laser 'hits' invader
            clearInterval(laserTimerId) //stop timer
            cells[laserIndex].classList.remove('invaders', 'laser') // clear cell from both classes
            const hitInvader = invaderArray.indexOf(laserIndex) //! locates the index of hit invader
            invaderArray.splice(hitInvader, 1) //! use .filter() here instead?
            score += 1000
            scoreTally.innerHTML = score
            if (invaderArray.length === 0) {
              window.alert(`You win! Your score is: ${score}`)
            }
          }
        }
      }
    }

    
    
    //* CHOOSE A RANDOM INVADER FROM FIRST ROW AND FIRE ENEMY LASER ---------------------------------------------------------
    function checkFirstRow() {
      const randomInvader = Math.floor(Math.random() * invaderArray.length) // get random number from the array length
      // console.log(randomInvader)
      let enemyLaserStart = invaderArray[randomInvader] + width // get cell directly below random invader
      // console.log(enemyLaserStart)
      if (!cells[enemyLaserStart].classList.contains('invaders')) { // if random invader is on first row
        cells[enemyLaserStart].classList.add('enemy') // start laser here
      } else if (!cells[enemyLaserStart + width].classList.contains('invaders')) { // if random invader is on second row
        cells[enemyLaserStart].classList.add('enemy') // start laser here
      } else {
        cells[enemyLaserStart + width + width].classList.add('enemy')
      }

      enemyFire()
      enemyFireTimerId = setInterval(enemyFire, 500)

      //* ENEMY LASER ADVANCE ACROSS THE GRID
      function enemyFire() {
        cells[enemyLaserStart].classList.remove('enemy') // remove enemy laser class
        if (enemyLaserStart <= 110) { // stop at the bottom
          enemyLaserStart += width // make laser move down
          cells[enemyLaserStart].classList.add('enemy')
          if (cells[enemyLaserStart].classList.contains('spaceship')) {
            gameOver()
          }
        } else {
          clearInterval(enemyLaserStart)
        }
      }
    }

    function gameOver() {
      window.alert(`Game over! Your score is: ${score}`)
      gameRunning = false
      clearInterval(timerId)
      clearInterval(laserTimerId)
      clearInterval(enemyFireTimerId)
      clearInterval(firstRowTimerId)
      clearGrid()
    }

    function clearGrid() { // resetting variables for game restart
      grid.innerHTML = ''
      score = 0
      scoreTally.textContent = score
      cells = []
      invaderArray = [0, 1, 2, 3, 4, 5, 6, 7,
        11, 12, 13, 14, 15, 16, 17, 18,
        22, 23, 24, 25, 26, 27, 28, 29]
      direction = 1
      playerPosition = 115
    }

    document.addEventListener('keydown', handleKeyDown)
    startBtn.addEventListener('click', firstRowTimer)

  }

  //* FUNCTION TO START GAME ---------------------------------------------------

  function handleStartBtn() {
    gameInit()
    // startBtn.disabled = true
    event.target.blur()
  }

  startBtn.addEventListener('click', handleStartBtn)
  resetBtn.addEventListener('click', gameInit)

}

window.addEventListener('DOMContentLoaded', init)