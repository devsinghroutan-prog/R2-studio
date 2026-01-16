// elements
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const body = document.body;

// safety
if (menuBtn && sidebar) {

  // ☰ click
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    sidebar.classList.toggle("active");

    // 🔥 THIS LINE FIXES PUSH / NO OVERLAP
    body.classList.toggle("sidebar-open");
  });

  // sidebar ke andar click
  sidebar.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // bahar click
  document.addEventListener("click", () => {
    sidebar.classList.remove("active");
    body.classList.remove("sidebar-open");
  });
}
