# Copter War 🚁🔥

**Copter War** is a simple 2D JavaScript game that utilizes the Canvas and Context 2D API. The game is set in a desert
environment where the player controls a helicopter, tasked with shooting down enemy helicopters. This project is
designed to help beginners understand the basics of game engines and game design.

## Demo

Check out the game in action!
[Copter War](https://yashas-hm.github.io/copter-war/)

![ScreenRecording2024-09-13at1 42 16PM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/bb6b63c5-f354-4808-81a1-b230a60768c0)

## Features

- **Canvas and 2D Context API**: Built entirely with JavaScript and the HTML5 Canvas API.
- **Desert Environment**: The game is set in a desert with a scrolling background for a dynamic environment.
- **Player Helicopter**: Control a helicopter, move up and down, and fire at enemies.
- **Hierarchical Models**: Different game elements like player, enemies, cacti and projectiles have their own behaviors
  and movement patterns.
- **Random Cacti Spawning**: Randomly generated cacti appear in the desert to enhance the environment and increase the
  challenge.
- **Enemy Helicopters**: Enemy helicopters move on their own and appear at random intervals.

[//]: # (- **Collision Detection**: Detect collisions between bullets and enemy helicopters.)

[//]: # (- **Score System**: Earn points by shooting down enemy helicopters.)

[//]: # (- **Game Over**: The game ends when the player is hit by an enemy helicopter.)

## How It Works

The game uses the **HTML Canvas** for rendering and **JavaScript** for logic, utilizing the following features:

- **Canvas 2D API**: To draw and animate the helicopters, bullets, cacti, and other elements.
- **Object-Oriented Design**: Game objects such as player, enemies, bullets, and cacti are modeled using JavaScript
  classes.
- **Random Spawning**: Cacti are spawned randomly on the canvas to create a dynamic desert environment.
- **Game Loop**: A continuous loop that updates the game state and redraws the game canvas at a fixed interval.
- **Event Handling**: Controls for the player helicopter using keyboard events for movement and shooting.

## Controls

- **Arrow Keys**: Move the helicopter up, down, left, and right.
- **Spacebar**: Shoot missiles at enemy helicopters.
