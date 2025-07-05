const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent =
  `Last Modification: ${document.lastModified}`;

// Navigation button //
const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
}); 

// Toggle Buttons //
document.addEventListener("DOMContentLoaded", () => {
    const allCourses = document.querySelectorAll(".course");
    const creditDisplay = document.getElementById("creditTotal");

    function showCourses(categories) {
      let total = 0;

      allCourses.forEach(course => {
        const matches = categories.some(cat => course.classList.contains(cat));
        course.style.display = matches ? "block" : "none";
        if (matches) total += 2;
      });

      creditDisplay.textContent = `The total credits for courses listed above is ${total}`;
    }

    document.getElementById("allbtn").addEventListener("click", () => {
      showCourses(["wdd", "cse"]);
    });

    document.getElementById("wddbtn").addEventListener("click", () => {
      showCourses(["wdd"]);
    });

    document.getElementById("csebtn").addEventListener("click", () => {
      showCourses(["cse"]);
    });

    showCourses(["wdd", "cse"]);
});