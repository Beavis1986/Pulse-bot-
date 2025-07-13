const pattern = [600, 200, 800]; // Rhythm intervals in milliseconds
const tolerance = 250; // Allowable deviation per interval

let tapTimes = [];
let scene = document.getElementById("scene");
let message = document.getElementById("message");
let resetBtn = document.getElementById("reset");

function registerTap() {
  const now = performance.now();
  tapTimes.push(now);

  // Animate a subtle pulse on tap
  scene.style.transform = "scale(1.01)";
  setTimeout(() => (scene.style.transform = "scale(1)"), 100);

  if (tapTimes.length > pattern.length + 1) {
    tapTimes.shift(); // Keep only the latest taps
  }

  if (tapTimes.length === pattern.length + 1) {
    const intervals = [];
    for (let i = 1; i < tapTimes.length; i++) {
      intervals.push(tapTimes[i] - tapTimes[i - 1]);
    }

    if (checkPattern(intervals)) {
      wakePulseBot();
    } else {
      failFeedback();
    }
  }
}

function checkPattern(inputIntervals) {
  return inputIntervals.every((interval, i) => {
    return Math.abs(interval - pattern[i]) <= tolerance;
  });
}

function wakePulseBot() {
  scene.classList.remove("sleeping");
  scene.classList.add("awake");

  message.innerText = "✨ You did it. PulseBot is awake!";
  message.style.display = "block";
  resetBtn.style.display = "block";
}

function failFeedback() {
  scene.style.transform = "translateX(-2px)";
  setTimeout(() => (scene.style.transform = "translateX(2px)"), 50);
  setTimeout(() => (scene.style.transform = "translateX(0px)"), 100);
}

function resetGame() {
  tapTimes = [];
  scene.classList.remove("awake");
  scene.classList.add("sleeping");
  message.style.display = "none";
  resetBtn.style.display = "none";
}

scene.addEventListener("click", registerTap);
scene.addEventListener("touchstart", registerTap);
resetBtn.addEventListener("click", resetGame);
