const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startFocus");

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

// Restore focus state
chrome.storage.local.get("focusEndTime", (data) => {
  if (data.focusEndTime && Date.now() < data.focusEndTime) {
    setActiveUI();
  }
});

// Start focus
startBtn.addEventListener("click", () => {
  const hours = Number(hoursInput.value) || 0;
  const minutes = Number(minutesInput.value) || 0;
  const seconds = Number(secondsInput.value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    alert("Please enter a valid time");
    return;
  }

  chrome.runtime.sendMessage({
    action: "START_FOCUS",
    seconds: totalSeconds
  });

  setActiveUI();
});

// UI update
function setActiveUI() {
  statusEl.textContent = "Focus Running";
  statusEl.classList.remove("inactive");
  statusEl.classList.add("active");

  startBtn.disabled = true;
}
