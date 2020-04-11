function init() {
  // * Game Start

  const startBtn = document.querySelector('.start')

  function gameInit() {

    //* Grid variables

    const grid = document.querySelector('.grid')
    const cells = []
    const width = 20
    const cellCount = width * width

    //* Game start variables

    let playerPosition = 390
    const invaderArray = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34]

    // createInvader()

    //* Create grid 

    function createGrid(startingPosition) {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.textContent = i
        grid.appendChild(cell)
        cells.push(cell)
      }
      cells[startingPosition].classList.add('spaceship')
    }

    //* Player spaceship movement

    function handleKeyDown(event) {
      cells[playerPosition].classList.remove('spaceship')
      switch (event.keyCode) {
        case 39:
          playerPosition < 399 ? playerPosition++ : playerPosition
          break
        case 37:
          playerPosition > 380 ? playerPosition-- : playerPosition
          break
        default:
          playerPosition
      }
      cells[playerPosition].classList.add('spaceship')
    }

    //* Create invaders --- 
    function createInvaders() {
      invaderArray.forEach(invader =>
        cells[invader].classList.add('invaders'))
    }

    createGrid(playerPosition)
    createInvaders()
    document.addEventListener('keydown', handleKeyDown)
    
  }
  
  function handleStartBtn() {
    gameInit()
  }

  startBtn.addEventListener('click', handleStartBtn)

}

window.addEventListener('DOMContentLoaded', init)