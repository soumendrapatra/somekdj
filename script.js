const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
// Ensure required elements exist before attaching listeners
if (!questionContainer || !resultContainer || !gifResult || !heartLoader || !yesBtn || !noBtn) {
  console.warn(
    "Some required DOM elements are missing:",
    { questionContainer, resultContainer, gifResult, heartLoader, yesBtn, noBtn }
  );
} else {
  // Function to move the No button to a random position
  function moveNoButton() {
    const maxX = Math.max(questionContainer.offsetWidth - noBtn.offsetWidth, 50);
    const maxY = Math.max(questionContainer.offsetHeight - noBtn.offsetHeight, 50);
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
  }

  // Move when cursor hovers over
  noBtn.addEventListener("mouseover", moveNoButton);

  // Move away from cursor proximity on desktop
  document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    if (distance < 100) {
      moveNoButton();
    }
  });

  // Move away from touch on mobile
  document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = noBtn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(touch.clientX - btnCenterX, touch.clientY - btnCenterY);

      if (distance < 120) {
        moveNoButton();
      }
    }
  });

  // Prevent clicking the No button
  noBtn.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveNoButton();
    },
    true
  );

  // Yes button functionality
  yesBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
    heartLoader.style.display = "inherit";

    setTimeout(() => {
      heartLoader.style.display = "none";
      resultContainer.style.display = "inherit";
      if (typeof gifResult.play === "function") {
        gifResult.play().catch(() => {});
      }
    }, 3000);
  });
}