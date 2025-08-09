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

// --- Modals --- 
const modal = document.getElementById('myModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');

if (modal && openBtn && closeBtn) {
    openBtn.onclick = () => {
      modal.style.display = 'block';
      modal.classList.add('show');
  };

  closeBtn.onclick = () => {
    modal.style.display = 'none';
    modal.classList.remove('show');
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
    }
  };
}

 // --- Timestamp for form hidden input ---
  const timestampElem = document.getElementById("timestamp");
  if (timestampElem) {
    const now = new Date();
    const formatted = now.toLocaleString();
    timestampElem.value = formatted;
  }

  // --- Display form data on thankyou.html ---
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  }

  (function displayFormData() {
    const data = getQueryParams();
    for (const key in data) {
      const el = document.getElementById(key);
      if (el) {
        el.textContent = data[key];
      }
    }
  })();