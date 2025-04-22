# Bubble Game 🎮

A fun and simple web-based game where players test their speed and accuracy by clicking numbered bubbles that match a target value before the timer runs out. Built with plain HTML, CSS, and JavaScript.

Live on: https://sharath-shetty28.github.io/Bubble-Game/

<!-- Optional: Add a screenshot of the game here -->
<!-- ![Bubble Game Screenshot](path/to/your/screenshot.png) -->
![image](https://github.com/user-attachments/assets/eea29b20-dfd8-4a16-833b-6decad49f882)


## Features

*   **Classic Gameplay:** Click bubbles matching the "Hit" number.
*   **Score Tracking:** Earn 10 points for each correct hit.
*   **Countdown Timer:** A 60-second timer adds urgency.
*   **Dynamic Hit Target:** The target number changes after each successful hit.
*   **Responsive Design:** Adapts layout and element sizes for various devices (desktop, tablet, mobile).
*   **Adaptive Bubble Area:** Bubbles dynamically calculate and fill the available game space, adjusting on window resize.
*   **Pause/Resume:** Ability to pause the game and timer, then resume play.

## Getting Started

To run the game locally:

1.  **Download:** Get the source code files:
    *   `index.html`
    *   `style.css`
    *   `script.js`
2.  **Directory:** Place all three files in the same folder on your computer.
3.  **Open:** Open the `index.html` file directly in your preferred web browser (like Chrome, Firefox, Edge, Safari).

That's it! The game should load and be ready to play.

## How to Play

1.  Click the **"Start Game"** button.
2.  Look at the **"Hit"** value displayed in the top panel.
3.  Quickly find and click/tap the bubble in the play area (`.pbtm`) containing the same number as the "Hit" value.
4.  Each correct hit increases your **"Score"** by 10, generates a new set of bubbles (filling the space), and assigns a new "Hit" value.
5.  Keep clicking the correct bubbles before the **"Timer"** reaches zero.
6.  Use the **"Pause"** button to temporarily stop the game and timer. Click **"Resume"** to continue.
7.  When the timer runs out, the game ends, showing your final score and a **"Play Again"** button.

## Technologies Used

*   **HTML5:** For the structure and content of the game page.
*   **CSS3:** For styling, layout (Flexbox), responsiveness (Media Queries, Clamp), and animations/transitions.
*   **Vanilla JavaScript (ES6+):** For game logic, DOM manipulation, event handling, timer management, and dynamic bubble generation/calculation.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](link/to/your/issues/page) (if applicable) or submit a pull request.

