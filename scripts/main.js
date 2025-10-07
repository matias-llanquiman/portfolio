import { data } from "../data/data.content.js";

const navItems = document.querySelectorAll("#header-nav div input");
const mainTitle = document.querySelector("#content #main-title");
const mainContent = document.querySelector("#content #main-content");
const radioPagination = document.querySelectorAll(
  "#pagination input[type=radio]",
);

let positionCount = 0;
let isAnimating = false;

function updateUI() {
  const sectionContent = data[positionCount];
  const sectionName = sectionContent.section;
  let contentCount;
  if (sectionContent.content) {
    contentCount = sectionContent.content.length;
  }
  console.log(contentCount);

  if (!sectionContent) return;

  mainTitle.addEventListener(
    "transitionend",
    () => {
      mainTitle.textContent = sectionContent.title || "";
      mainContent.textContent = sectionContent.text || "";

      mainTitle.classList.add("show");
      mainContent.classList.add("show");

      radioPagination.forEach((r, i) => (r.checked = i === positionCount));
      navItems.forEach(
        (item) => (item.checked = item.classList[0] === sectionName),
      );

      isAnimating = false;
    },
    { once: true },
  );
}

function handleWheel(e) {
  if (isAnimating) return;
  mainTitle.classList.remove("show");
  mainContent.classList.remove("show");
  isAnimating = true;

  if (e.deltaY > 0 && positionCount < data.length - 1) {
    positionCount++;
  } else if (e.deltaY < 0 && positionCount > 0) {
    positionCount--;
  }

  updateUI();
}

document.addEventListener("wheel", handleWheel, { passive: true });

navItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    positionCount = i;
    updateUI();
  });
});

updateUI();
