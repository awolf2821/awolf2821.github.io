# Project Preface
This project involves essentially everything encompassed in this course thus far, HTML and Javascript. The end goal of the project is to produce
a simple game that runs on the HTML canvas using javascript code to interact. The design is left completely up to the students and the students are allowed
to do whatever they want within the limits of the javascript itself. While classic games can be emulated/remade, they cannot be plagarized, along with 
the general dissaproval of the use of generative AI. 

## My Idea
My idea was to replicate the classic game, snake, with the HTML canvas. For those who do not know, the point of snake is to simple move around as a snake, and to eat fruits which will cause your snake to grow, the player must avoid bumping into any of the four walls. The game is relativey simple to program and can even be
shrunk down to fit into a QR code as raw binary. It also requires zero explanation, as it's very easy to learn and to play.

## The Game Itself
The game will utilize a 640X640 window, and use a canvas of the same size. The background will be made up of alternating color
tiles that are 20px wide and 20px high. This background will fill the entire canvas and will be generated once at the beginning of the code and will remain still,
while the characters will move with each frame. This is similar to the techniuqe animators used in the late days of hand-drawn animation (i.e 80s & 90s) where the background was pre-drawn and the characters were moved on the transparent sheet. Each individual character block will be square, so using simple square hitboxes will work fine. The end goal will be to eat enough fruits to make your snake 20 blocks long, and the player will lose if the snake's head hits the outside wall.

## Interaction
Interaction will be handled fairly easily with the scores and reset buttons being displayed below the window with HTML edited via the Javascript. The player will 
use the arrow keys to create a turn point for the snake. Each block will follow through the turn point and reorient properly (i.e start moving left instead of up).

## MVP
The MVP for this will include at the least, a mechanic for moving the snake, wall touch detection, and random fruit location generation. The background and initial tiling won't be present, and the snake will be able to move freely from the grid not using the turn points. 
