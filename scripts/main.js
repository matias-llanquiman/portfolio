const navItems = document.querySelectorAll("#header-nav ul li a");

function toggleActive(e) {
  navItems.forEach((item) => item.classList.remove("tab-active"));
  e.currentTarget.classList.add("tab-active");
}

navItems.forEach((item) => {
  item.addEventListener("click", toggleActive);
});
