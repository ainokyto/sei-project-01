![game-screenshot](../assets/start.png)
# Space Invaders
## GA Project One
My first dev project for the Software Engineering Immersive course and also my first project using JavaScript.

## Getting started

The game has been deployed with GitHub Pages and is available [here](ainokyto.github.io/sei-project-one/).

Alternatively,

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

![game-screenshot](../assets/game.png)

## Process
I started developing the game by sketching out a plan of all the different functionalities the game should have, and ranked them to critical for MVP and Nice-To-Haves. I then started pseudocoding my MVP down into bite size chunks to make sure I could deliver it in time to allow time for polishing and styling. 
* I created the game grid square by setting a value for width, using a for-loop to create a div element while the index value was less than width times width. I then pushed these divs to an empty array and appended them to the grid div in my HTML.
* I made one div for player spaceship, and created keydown event listeners to allow the player to move and fire when the corresponding keys are pressed, with logic to refrain player from moving off the grid.
* I placed the invaders on the grid by creating an invaders array, which included the index values of the squares on the grid 
* Then I worked on the invader movement logic, which moves the invaders right, down, left and down following a lead invader. I created a set interval which runs until the invaders reach the bottom row.
* Then it was time to create some projectiles. As an effort to make the game a bit more challenging, player lasers are limited to one column at a time. Invaders fire by selecting a random invader from the first row to fire every 2 seconds.
* When the invaders reach the bottom row or when the player is hit by invader fire, this calls a Game Over function which displays player's score and clears the grid and resets the game variables

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
