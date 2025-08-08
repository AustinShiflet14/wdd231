// --- Copyright Year ---
const currentYearElem = document.getElementById("currentyear");
  if (currentYearElem) {
    const currentYear = new Date().getFullYear();
    currentYearElem.textContent = currentYear;
  }

  const lastModifiedElem = document.getElementById("lastModified");
  if (lastModifiedElem) {
    lastModifiedElem.textContent = `Last Modification: ${document.lastModified}`;
  }
// --- Hamburger Menu ---
  const navbutton = document.querySelector('#ham-btn');
  const navBar = document.querySelector('#nav-bar');
  if (navbutton && navBar) {
    navbutton.addEventListener('click', () => {
      navbutton.classList.toggle('show');
      navBar.classList.toggle('show');
    });
  }