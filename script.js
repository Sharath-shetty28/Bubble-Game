// --- Helper: Debounce Function ---
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// --- Game Variables ---
let timer = 60;
let score = 0;
let hitrn;
let timerInterval;
let isGameRunning = false;
let isPaused = false;

// --- DOM Elements ---
const pbtm = document.querySelector(".pbtm");
const timerValueEl = document.querySelector("#timervalue");
const scoreValEl = document.querySelector("#scoreval");
const hitValEl = document.querySelector("#hitval");
const startGameBtn = document.querySelector("#startGameBtn");
const pauseGameBtn = document.querySelector("#pauseGameBtn");

// --- Core Game Functions ---

function makebubble() {
  // 1. Clear existing bubbles immediately
  pbtm.innerHTML = "";

  // 2. Check if panel has dimensions yet (might be 0 on initial load before layout)
  const pbtmWidth = pbtm.clientWidth;
  const pbtmHeight = pbtm.clientHeight;

  if (pbtmWidth <= 0 || pbtmHeight <= 0) {
    // If dimensions aren't ready, try again shortly or skip
    console.warn("Panel dimensions not ready for bubble calculation.");
    // Optionally, retry after a short delay:
    // setTimeout(makebubble, 50);
    return; // Exit if no space
  }

  // 3. Measure a single bubble and the gap
  let bubbleSize = 50; // Default estimate
  let gap = 10; // Default estimate

  // Create a temporary bubble to measure
  const tempBubble = document.createElement("div");
  tempBubble.className = "bubble";
  tempBubble.style.visibility = "hidden"; // Keep it invisible
  tempBubble.style.position = "absolute"; // Don't affect layout
  pbtm.appendChild(tempBubble);

  // Get computed styles
  try {
    const computedStyleBubble = getComputedStyle(tempBubble);
    const computedStylePbtm = getComputedStyle(pbtm);

    // Use offsetWidth/Height for actual rendered size
    bubbleSize = tempBubble.offsetWidth;
    // Use parseFloat to convert 'Xpx' to number
    // Use columnGap for horizontal spacing, rowGap for vertical
    const colGap =
      parseFloat(computedStylePbtm.columnGap) ||
      parseFloat(computedStylePbtm.gap) ||
      8; // Fallback gap
    const rowGap =
      parseFloat(computedStylePbtm.rowGap) ||
      parseFloat(computedStylePbtm.gap) ||
      8; // Fallback gap

    // Calculate effective space needed per bubble
    const effectiveBubbleWidth = bubbleSize + colGap;
    const effectiveBubbleHeight = bubbleSize + rowGap; // Assuming square bubbles, use bubbleSize height too

    if (
      bubbleSize > 0 &&
      effectiveBubbleWidth > 0 &&
      effectiveBubbleHeight > 0
    ) {
      // 4. Calculate how many fit (adjust for gap on edges)
      const numHorizontal = Math.floor(
        (pbtmWidth + colGap) / effectiveBubbleWidth
      );
      const numVertical = Math.floor(
        (pbtmHeight + rowGap) / effectiveBubbleHeight
      );
      var totalBubbles = numHorizontal * numVertical;

      // Add a sanity check / minimum bubbles
      totalBubbles = Math.max(5, totalBubbles); // Ensure at least a few bubbles
    } else {
      console.warn("Could not calculate bubble fit, using default.");
      var totalBubbles = 20; // Fallback number
    }
  } catch (e) {
    console.error("Error measuring bubble/gap:", e);
    var totalBubbles = 20; // Fallback on error
  } finally {
    // Clean up the temporary bubble
    pbtm.removeChild(tempBubble);
  }

  // 5. Generate the calculated number of bubbles
  var clutter = "";
  for (var i = 1; i <= totalBubbles; i++) {
    var rn = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${rn}</div>`;
  }
  pbtm.innerHTML = clutter;
}

function runtimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    if (isPaused) return;
    if (timer > 0) {
      timer--;
      timerValueEl.textContent = timer;
    } else {
      endGame();
    }
  }, 1000);
}

function getNewHit() {
  hitrn = Math.floor(Math.random() * 10);
  hitValEl.textContent = hitrn;
}

function increaseScore() {
  score += 10;
  scoreValEl.textContent = score;
}

function endGame() {
  clearInterval(timerInterval);
  isGameRunning = false;
  isPaused = false;
  pbtm.classList.remove("paused");
  startGameBtn.textContent = "Start Game";
  startGameBtn.disabled = false;
  pauseGameBtn.textContent = "Pause";
  pauseGameBtn.disabled = true;

  pbtm.innerHTML = `
        <div class="game-over">
            <h1>Game Over!</h1>
            <p>Your Final Score: ${score}</p>
            <button id="playAgainBtn">Play Again</button>
        </div>`;
  const playAgainBtn = pbtm.querySelector("#playAgainBtn");
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", startGame);
  }
}

function startGame() {
  pbtm.innerHTML = ""; // Clear panel first

  isGameRunning = true;
  isPaused = false;
  pbtm.classList.remove("paused");
  startGameBtn.textContent = "Restart Game";
  pauseGameBtn.textContent = "Pause";
  pauseGameBtn.disabled = false;

  score = 0;
  timer = 60;
  scoreValEl.textContent = score;
  timerValueEl.textContent = timer;

  getNewHit();
  runtimer();
  // Crucially, call makebubble *after* setting up the game state
  // Might need a tiny delay for layout to settle, especially on initial load
  // Although measuring inside makebubble should handle it better now.
  makebubble();
}

// --- Event Listeners ---

// Bubble Clicks (Delegated)
pbtm.addEventListener("click", function (dets) {
  if (!isGameRunning || isPaused || !dets.target.classList.contains("bubble")) {
    return;
  }
  var clickednum = Number(dets.target.textContent);
  if (clickednum === hitrn) {
    increaseScore();
    makebubble(); // Regenerate to fill space
    getNewHit();
  }
});

// Pause/Resume Button
pauseGameBtn.addEventListener("click", function () {
  if (!isGameRunning) return;
  isPaused = !isPaused;
  if (isPaused) {
    pauseGameBtn.textContent = "Resume";
    pbtm.classList.add("paused");
  } else {
    pauseGameBtn.textContent = "Pause";
    pbtm.classList.remove("paused");
  }
});

// Start/Restart Button
startGameBtn.addEventListener("click", startGame);

// --- Resize Handling ---
// Debounced version of makebubble for resize events
const debouncedMakeBubble = debounce(() => {
  // Only regenerate bubbles if the game is actually running and not paused
  if (isGameRunning && !isPaused) {
    console.log("Window resized, regenerating bubbles...");
    makebubble();
    // Optional: May need to get a new hit if the number/position changes drastically
    // getNewHit();
  }
}, 250); // Adjust wait time (milliseconds) as needed

// Add resize listener
window.addEventListener("resize", debouncedMakeBubble);

// --- Initial State ---
// Placeholder handled by HTML/CSS
// Ensure pause button is disabled initially (handled by HTML)
