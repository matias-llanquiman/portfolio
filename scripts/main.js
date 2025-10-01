import { dataContent } from "../data/data.content.js";

const navItems = document.querySelectorAll("#header-nav ul li a");
const mainTitle = document.querySelector("#content #main-title");
const mainContent = document.querySelector("#content #main-content");

function toggleActive(e) {
  navItems.forEach((item) => item.classList.remove("tab-active"));
  e.currentTarget.classList.add("tab-active");
}

navItems.forEach((item) => {
  item.addEventListener("click", toggleActive);
});

function modifyText(id) {
  const section = dataContent.find((item) => item.id === id);
  switch (id) {
    case 1:
      mainTitle.textContent = section.title1;
      count -= 0.5;
      break;
    case 1.5:
      const subSection = dataContent.find((item) => item.id === 1);
      mainTitle.textContent = subSection.title2;
      count -= 0.5;
      break;
    case 2:
      mainTitle.textContent = section.title;
      mainContent.textContent = section.text;
      break;
    case 3:
      mainTitle.textContent = section.name;
      mainContent.textContent = section.description;
      break;

    default:
      break;
  }
}

let count = 0;
document.addEventListener("wheel", () => {
  count++;
  mainTitle.classList.toggle("show");
  mainContent.classList.toggle("show");
  setTimeout(() => {
    modifyText(count);
    mainTitle.classList.add("show");
    mainContent.classList.add("show");
  }, 800);
});
