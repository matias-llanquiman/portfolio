import { dataContent } from "../data/data.content.js";

const navItems = document.querySelectorAll("#header-nav ul li a");
const mainTitle = document.querySelector("#content #main-title");
const mainContent = document.querySelector("#content #main-content");
const radioPagination = document.querySelectorAll(
  "#pagination input[type=radio]",
);

let positionCount = 0;
let isAnimating = false;

function updateUI() {
  const section = dataContent[positionCount];

  if (!section) return;

  mainTitle.classList.remove("show");
  mainContent.classList.remove("show");

  mainTitle.addEventListener(
    "transitionend",
    () => {
      mainTitle.textContent = section.title || "";
      mainContent.textContent = section.text || "";

      mainTitle.classList.add("show");
      mainContent.classList.add("show");

      radioPagination.forEach((r, i) => (r.checked = i === positionCount));

      isAnimating = false;
    },
    { once: true },
  );
}

function handleWheel(e) {
  if (isAnimating) return;
  isAnimating = true;

  if (e.deltaY > 0 && positionCount < dataContent.length - 1) {
    positionCount++;
  } else if (e.deltaY < 0 && positionCount > 0) {
    positionCount--;
  }

  updateUI();
}

document.addEventListener("wheel", handleWheel, { passive: true });

navItems.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    positionCount = i;
    updateUI();
  });
});
