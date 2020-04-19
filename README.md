![ga-red-logo](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
# General Assembly Project One - Space Invaders Style Game
My first develeopment project for the Software Engineering Immersive course and also my first project using JavaScript.

## Goal:
To build a functioning browser game with Vanilla JavaScript.

## Timeframe:
8 days

## Getting started
<hr>
1. Access the source code can be accessed via the 'Clone or download' button 
2. Open the ```index.html``` file in your browser of choice to start the game.

## Deployment
This game has been deployed on GitHub Pages and is located in: ainokyto.github.io/sei-project-one/

## Technologies used:
* HTML5
* CSS3
* JavaScript
* GitHub

## Brief:
Space Invaders is a classic 80s Taito arcade game. The player, moving left or right, aims to shoot an invading alien armada and achieve the highest score possible before either being eradicated by lasers that the aliens shoot periodically, or allowing the armada to reach the planet's surface.

My iteration pays tribute to the controversial 2020 hit show, Netflix's 'Tiger King - Murder, Mayhem and Madness'. Joe Exotic is defending his zoo by trowing tiger cubs towards an armada of his nemesis, Carole Baskin.

## Process
I started developing the game by sketching out a thorough plan of all the different functionalities I wanted the game to have, and pseudocoded each step down into bite size chunks. 
* I created the game grid by setting a value for width, using JavaScript to create div elements while the index value was less than width times width. I then pushed these divs to an empty array and appended them to the grid div in my html.
* I created keydown event listeners to allow the player to move and fire when the corresponding keys are pressed, with logic to refrain player from moving off the grid.
* I placed the invaders on the grid by creating an invaders array, which included the index values of the squares on the grid
* Then I worked on the invader movement logic, which moves the invaders right, down, left and down. I created a set interval which runs until the invaders reach the bottom row.
* Then it was time to create some projectiles. As an effort to make the game a bit more challenging, player lasers are limited to one column at a time. Invaders fire by selecting a random invader from the first row to fire every 2 seconds.
* When the invaders reach the bottom row or when the player is hit by invader fire, this calls a Game Over function which displays player's score and clears the grid and resets the game variables

### Challenges
This was my first project using JavaScript so I faced many challenges, of which the biggest were:
* Invader armada movement logic that should remain inaffected by changes to the invader array
* Collision detection logic
* Working with various set timers to create movement

### Wins
* Gained experience in programmatical thinking, logical problem solving and different planning stages 
* A great learning experience and a fun way to consolidate my learnings, in particular JS array methods, timers and DOM manipulation
* A fun and topical design theme that adds value to the user

## Future improvements
A few issues remain to be ironed out, and there are also a few features I would like to add going forward:
* Collision logic needs a bit more work
* Add-ons to the game flow: spawning new invaders, adding the mothership, different hit scores for each invader row, level-up
* High Score tally leveraging local storage
* Start Game and Finish Game modules with using popup functionality
* Adding responsive design
* CSS animations to achieve a more impactful design 
