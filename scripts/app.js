function init () {

  //* Grid variables

  const grid = document.querySelector('.grid')
  const cells = []
  const width = 20
  const cellCount = width * width
  
  //* Create grid dynamically

  let playerPosition = 390
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
  


  createGrid(playerPosition)
  document.addEventListener('keydown', handleKeyDown)
}

window.addEventListener('DOMContentLoaded', init)