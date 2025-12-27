function cleanYouTube() {
  // Remove homepage feed
  const home = document.querySelector("ytd-rich-grid-renderer");
  if (home) home.style.display = "none";

  // Remove right-side recommendations
  const related = document.getElementById("related");
  if (related) related.style.display = "none";

  // Remove Shorts
  document.querySelectorAll("ytd-reel-shelf-renderer")
    .forEach(el => el.remove());

  // Disable autoplay
  const autoplay = document.querySelector(".ytp-autonav-toggle-button");
  if (autoplay && autoplay.getAttribute("aria-checked") === "true") {
    autoplay.click();
  }
}

// YouTube is SPA → keep cleaning
setInterval(cleanYouTube, 1000);
