# Space Invaders - GA Project One

My first dev project for the Software Engineering Immersive course and also my first ever project using JavaScript.

![game-screenshot](./assets/screenshots/start.png)

## Deployment

The game has been deployed with GitHub Pages and is available [here](http://ainokyto.github.io/sei-project-01/).

## Getting started

1. Access the source code via the 'Clone or download' button 
2. Open the index.html file in your browser of choice to start the game.


## Goal and timeframe:
To build a functioning browser game with pure JavaScript in 8 days.


## Technologies used:
* HTML5
* CSS3
* JavaScript
* GitHub


## Brief:
Space Invaders is a classic 80s Taito arcade game. The player, moving left or right, aims to shoot an invading alien armada and achieve the highest score possible before either being eradicated by lasers that the aliens shoot periodically, or allowing the armada to reach Planet Earth's surface.

My iteration pays tribute to the 2020 controversial Netflix hit, 'Tiger King - Murder, Mayhem and Madness'. Joe Exotic is defending his zoo by throwing tiger cubs towards an armada of his nemesis, Carole Baskin.

![game-screenrec](./assets/screenshots/tiger.gif)

## Process
I started developing the game by sketching out a plan of all the different functionalities the game should have, and ranked them to critical for MVP and Nice-To-Haves. I then started pseudocoding my MVP down into bite size chunks to make sure I could deliver it in time to allow time for polishing and styling. 
* I created the game grid square by setting a value for width, using a for-loop to create a div element while the index value was less than width times width. I then pushed these divs to an empty array and appended them to the grid div in my HTML.
* I made one div for player spaceship, and created keydown event listeners to allow the player to move and fire when the corresponding keys are pressed, with logic to refrain player from moving off the grid.

```javascript
    // PLAYER SPACESHIP MOVEMENT ---------------------------------------------

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
```

* I placed the invaders on the grid by creating an invaders array, which included the index values of the squares on the grid
* Then I worked on the invader movement logic, which moves the invaders right, down, left and down following a lead invader. I created a set interval which runs until the invaders reach the bottom row.

```javascript
      // INVADER MOVEMENT LOGIC ------------------------------------------------

      if (leadInvader % width === 3 && direction === 1) {
        direction = width
      } else if (leadInvader % width === 3 && direction === width) {
        direction = -1
      } else if (leadInvader % width === 0 && direction === -1) {
        direction = width
      } else if (leadInvader % width === 0 && direction === width) {
        direction = 1
      }
      addInvaders()
      reachPlayer()
    }
```

* When the invaders reach the bottom row or when the player is hit by invader fire, this calls a Game Over function which displays player's score and clears the grid and resets the game variables.
* Then it was time to create some lasers. Laser movements across the grid are controlled timers. When player lasers hit the invader armada, the hit invader is spliced off the array, once all invaders are eliminated this calls a youWin() function. Invaders fire by setting a timer to select a random invader from the first row to fire every 2.5 seconds.

```javascript
      // MAKE LASER ADVANCE ACROSS THE GRID ----------------------------------------------------

      function laserAdvance() {
        cells[laserIndex].classList.remove('laser') // remove laser class
        if (laserIndex > width - 1) {
          laserIndex = laserIndex - width // finding the cell directly above current laserindex
          cells[laserIndex].classList.add('laser') // add class to next cell
          if (laserIndex === width - width) { // stops at the grid
            // console.log('past grid!')
            clearInterval(laserTimerId)
            cells[laserIndex].classList.remove('laser')
          }
          
          // COLLISION DETECTION ---------------------------------------------------------------

          if (cells[laserIndex].classList.contains('invaders')) { // If laser 'hits' invader
            clearInterval(laserTimerId) //stop timer
            cells[laserIndex].classList.remove('invaders', 'laser') // clear cell from both classes
            const killedInvader = invaderArray.indexOf(laserIndex) // locates the index of hit invader
            invaderArray.splice(killedInvader, 1)
            score += 1000
            scoreTally.innerHTML = score
            enemyAudio.src = './assets/zap.wav'
            enemyAudio.play()
            if (invaderArray.length === 0) {
              youWin()
            }
          }
        }
      }
    }
```

### Challenges
This was my first project using JavaScript so I faced many challenges, of which the biggest were:
* Invader armada movement logic that should remain inaffected by changes to the invader array
* Collision detection logic
* Working with various set timers to create movement


### Wins
* Gained experience in programmatical thinking, logical problem solving and different planning stages
* A great learning exercise and a fun way to consolidate my learnings, in particular DOM manipulation, JS array methods and timers 
* A fun and topical design theme


## Future improvements
A few issues remain to be ironed out, and there are also a few features I would like to add going forward:
* Collision logic needs a bit more work
* Add-ons and nice-to-haves to the game flow: spawning new invaders, adding the mothership, different hit scores for each invader row, level-up
* High Score tally leveraging local storage
* Start Game and Finish Game modules with using popup functionality
* Adding responsive design
* CSS animations to achieve a more impactful design 