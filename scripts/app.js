function init() {
  // * DOM ELEMENTS ----------------------------------------------------------

  const startBtn = document.querySelector('.start')
  const resetBtn = document.querySelector('.reset')
  const scoreTally = document.querySelector('.actualscore')

  // * GAME VARIABLES ------------------------------------------------------
  const grid = document.querySelector('.grid')
  const cells = []
  const width = 11
  const cellCount = width * width
  let score = 0
  let direction = 1
  let gameRunning = false
  let invaderArray = [0, 1, 2, 3, 4, 5, 6, 7,
    11, 12, 13, 14, 15, 16, 17, 18,
    22, 23, 24, 25, 26, 27, 28, 29]
  let playerPosition = 115
  let timerId = null
  let laserTimerId = null
  let enemyLaserTimerId = null
  let laserIndex = playerPosition - width // laser starts at cell directly above player

  //* // * START GAME --------------------------------------------------------

  function gameInit() {

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
    // in the if statement, -1 moves left, width down

    // game starts with invaders moving right
    // function removeInvaderss - remove classes
    // function addInvaders - based on the direction(1) variable


    function moveInvaders() {
      removeInvaders()
      if (invaderArray[0] % width === 3 && direction === 1) {
        direction = width
      } else if (invaderArray[0] % width === 3 && direction === width) {
        direction = -1
      } else if (invaderArray[0] % width === 0 && direction === -1) {
        direction = width
      } else if (invaderArray[0] % width === 0 && direction === width) {
        direction = 1
      } else if (invaderArray[0] > width * width - width) { // when the first invader hits cell index 111 
        gameOver()
      }
      addInvaders()
    }

    //* REMOVE INVADERS CLASS --------------------------------------------------
    function removeInvaders() {
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
    startTimer()

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
        case 32:
          fireLaser()
          break
        default:
          playerPosition
      }
      cells[playerPosition].classList.add('spaceship')
    }

    //* START ENEMY ATTACK TIMER 
    function enemyLaserTimer() {
      enemyLaserTimerId = setInterval(findEnemyLaser, 1000)
    }
    //* ENEMY LASER STARTING POINT
    function findEnemyLaser() { 
      const randomInvader = Math.floor(Math.random() * invaderArray.length) // get a random number from array
      let enemyLaserStart = invaderArray[randomInvader] + width
      console.log(randomInvader)
      if (!cells[enemyLaserStart].classList.contains('invaders')) {
        cells[enemyLaserStart].classList.add('enemy')
      } else if (!cells[enemyLaserStart + width].classList.contains('invaders')) {
        cells[enemyLaserStart + width].classList.add('enemy')
      } else {
        cells[enemyLaserStart + (width * 2)].classList.add('enemy')
      }
    
      enemyLaserAdvance()
      enemyLaserTimerId = setInterval(enemyLaserAdvance, 200)
      
      //* ENEMY LASER ADVANCE
      
      function enemyLaserAdvance() {
        cells[enemyLaserStart].classList.remove('enemy') // remove enemy class 
        if (enemyLaserStart <= 110) {
          enemyLaserStart += width
          cells[enemyLaserStart].classList.add('enemy')
          if (cells[enemyLaserStart].classList.contains('spaceship')) {
            gameOver()
          }
        } else {
          clearInterval(enemyLaserTimerId)
        }
      }
    }


    //* CREATE FUNCTION TO FIRE AT INVADERS ------------------------------------------------------

    function fireLaser() {
      cells[laserIndex].classList.add('laser')
      laserTimerId = setInterval(laserAdvance, 100)
    }
    //* FUNCTION TO MAKE LASER ADVANCE ACROSS THE GRID ------------------------------------------------------

    function laserAdvance() {
      cells[laserIndex].classList.remove('laser') // remove laser class
      if (laserIndex > width - 1) { // stops at the grid
        laserIndex = laserIndex - width // advancing on the cell directly above
        cells[laserIndex].classList.add('laser') // add class to new square
        //* COLLISION DETECTION
        if (cells[laserIndex].classList.contains('invaders')) { // If laser 'hits' invader
          clearInterval(laserTimerId) //stop timer
          cells[laserIndex].classList.remove('invaders', 'laser') // clear cell from both classes
          const index = invaderArray.indexOf(laserIndex) // locates the index of 'ht invader
          invaderArray.splice(index, 1) // removes hit invader from the invader array
          score += 1000
          scoreTally.innerHTML = score
        }
      }
    }


    //* event spacebar
    //* playerposition - width the starting cell that advances up on the grid
    //* index decrementing by width  
    //* class is being removed from the current cell and added on to the next cell

    function gameOver() {
      gameRunning = false
      console.log(gameRunning)
      clearInterval(timerId)
      clearInterval(laserTimerId)
      clearInterval(enemyLaserTimerId)
    }


    createGrid(playerPosition)
    createInvaders()
    document.addEventListener('keydown', handleKeyDown)
    startBtn.addEventListener('click', enemyLaserTimer)

  }

  //* FUNCTION TO START GAME ---------------------------------------------------

  function handleStartBtn() {
    event.target.blur()
    gameInit()
  }

  startBtn.addEventListener('click', handleStartBtn)
  resetBtn.addEventListener('click', gameInit)

}

window.addEventListener('DOMContentLoaded', init)