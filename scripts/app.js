function init () {

  //* Grid variables

  const grid = document.querySelector('.grid')
  const cells = []
  const width = 10
  const cellCount = width * width
  
  //* Create grid dynamically

  const playerPosition = 94
  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition].classList.add('spaceship')
  }
  createGrid(playerPosition)

}

window.addEventListener('DOMContentLoaded', init)