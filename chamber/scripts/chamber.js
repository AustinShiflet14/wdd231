document.addEventListener("DOMContentLoaded", () => {
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

  // --- Directory Page: Members List, Spotlights, Grid/List View ---
  const membersContainer = document.getElementById('membersContainer');
  const spotlightContainer = document.getElementById('spotlight');
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');

  function membershipLevelName(level) {
    switch(level) {
      case 1: return 'Member';
      case 2: return 'Silver';
      case 3: return 'Gold';
      default: return 'Unknown';
    }
  }

  function displayMembers(members) {
    if (!membersContainer) return;
    membersContainer.innerHTML = '';

    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" style="width:150px; height:auto;">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Website here!</a></p>
        <p>Membership Level: ${membershipLevelName(member.membershipLevel)}</p>
      `;

      membersContainer.appendChild(card);
    });
  }

  function displaySpotlights(members) {
    if (!spotlightContainer) return;
    spotlightContainer.innerHTML = '';

    const eligibleMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const spotlights = shuffled.slice(0, 3);

    spotlights.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} Logo" style="width:150px; height:auto;">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        <p>Membership Level: ${membershipLevelName(member.membershipLevel)}</p>
      `;

      spotlightContainer.appendChild(card);
    });
  }

  async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();

      if (membersContainer) displayMembers(members);
      if (spotlightContainer) displaySpotlights(members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }

  if (membersContainer || spotlightContainer) {
    fetchMembers();
  }

  if (membersContainer) {
    if (gridViewBtn) {
      gridViewBtn.addEventListener('click', () => {
        membersContainer.classList.add('grid');
        membersContainer.classList.remove('list');
      });
    }

    if (listViewBtn) {
      listViewBtn.addEventListener('click', () => {
        membersContainer.classList.add('list');
        membersContainer.classList.remove('grid');
      });
    }
  }

  // --- Events Page: Weather Data ---
  const myDescription = document.getElementById('description');
  const myTemperature = document.getElementById('temperature');
  const myWeather = document.getElementById('weatherIcon');
  const myHigh = document.getElementById('high');
  const myLow = document.getElementById('low');
  const myHumidity = document.getElementById('humidity');
  const mySunrise = document.getElementById('sunrise');
  const mySunset = document.getElementById('sunset');
  const forecastDiv = document.getElementById('forecast');

  if (myDescription && myTemperature && myWeather && myHigh && myLow && myHumidity && mySunrise && mySunset && forecastDiv) {
    const myKey = "3788e11a177ff67859dcd39256c1557a";
    const myLat = "33.1773";
    const myLon = "-111.5628";

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

    async function apiFetch() {
      try {
        const responseCurrent = await fetch(currentWeatherURL);
        if (!responseCurrent.ok) throw Error(await responseCurrent.text());
        const currentData = await responseCurrent.json();
        displayCurrentWeather(currentData);

        const responseForecast = await fetch(forecastURL);
        if (!responseForecast.ok) throw Error(await responseForecast.text());
        const forecastData = await responseForecast.json();
        displayForecast(forecastData);

      } catch (error) {
        console.log(error);
      }
    }

    function displayCurrentWeather(data) {
      myDescription.textContent = data.weather[0].description;
      myTemperature.innerHTML = `${data.main.temp}&deg;F`;
      myHigh.innerHTML = `High: ${data.main.temp_max}&deg;F`;
      myLow.innerHTML = `Low: ${data.main.temp_min}&deg;F`;
      myHumidity.innerHTML = `Humidity: ${data.main.humidity}%`;

      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

      mySunrise.innerHTML = `Sunrise: ${sunriseTime}`;
      mySunset.innerHTML = `Sunset: ${sunsetTime}`;

      const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      myWeather.setAttribute('src', iconsrc);
      myWeather.setAttribute('alt', data.weather[0].description);
    }

    function displayForecast(data) {
      forecastDiv.innerHTML = '';

      const shownDates = new Set();
      let daysShown = 0;

      for (let i = 0; i < data.list.length && daysShown < 3; i++) {
        const item = data.list[i];
        const date = new Date(item.dt * 1000);
        const dateStr = date.toDateString();

        if (!shownDates.has(dateStr)) {
          shownDates.add(dateStr);
          daysShown++;

          const dayName = daysShown === 1 ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'long' });
          const temp = Math.round(item.main.temp);

          const p = document.createElement('p');
          p.innerHTML = `<strong>${dayName}:</strong> ${temp}&deg;F`;
          forecastDiv.appendChild(p);
        }
      }
    }

    apiFetch();
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

  // --- Modals for membership cards ---
  const modalData = [
    {
      id: "np",
      title: "Non-Profit Membership",
      description: "Free listing for qualified organizations. Event invites and newsletter spotlights."
    },
    {
      id: "bronze",
      title: "Bronze Membership",
      description: "Includes event invites, basic listing, and limited ads."
    },
    {
      id: "silver",
      title: "Silver Membership",
      description: "Includes all Bronze benefits plus homepage spotlights and minor discounts."
    },
    {
      id: "gold",
      title: "Gold Membership",
      description: "Everything from Silver plus top listing, major ad space, and full event access."
    }
  ];

  function createModals() {
    const container = document.getElementById("modals-container");
    if (!container) return;

    modalData.forEach(({ id, title, description }) => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.id = `${id}-modal`;

      modal.innerHTML = `
        <div class="modal-content">
          <span class="close" onclick="closeModal('${id}')">&times;</span>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
      `;

      container.appendChild(modal);
    });
  }

  window.createModals = createModals;  // export for inline onclick handlers
  window.openModal = function(id) {
    const modal = document.getElementById(`${id}-modal`);
    if (modal) modal.style.display = "block";
  };

  window.closeModal = function(id) {
    const modal = document.getElementById(`${id}-modal`);
    if (modal) modal.style.display = "none";
  };

  window.addEventListener("click", function (e) {
    document.querySelectorAll(".modal").forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  createModals();
});