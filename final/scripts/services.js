// services.js
import { getServices } from './servicesData.js';

const container = document.getElementById('services-container');
const toggleFavoritesBtn = document.querySelector('main button');

const favoriteKey = 'favoriteServices';
let favorites = JSON.parse(localStorage.getItem(favoriteKey)) || [];

function saveFavorites() {
  localStorage.setItem(favoriteKey, JSON.stringify(favorites));
    }

    function renderServices(services) {
    container.innerHTML = '';
    services.forEach(service => {
        const card = document.createElement('div');
        card.classList.add('service-card');
        card.dataset.serviceId = service.id;

        card.innerHTML = `
        <button class="favorite-btn" aria-label="Toggle favorite">
            <svg class="heart-icon" width="24" height="24" viewBox="0 0 24 24" 
            fill="var(--fill-color)" stroke="var(--stroke-color)" stroke-width="2" >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
        <h2>${service.name}</h2>
        <p><strong>Description:</strong> ${service.description}</p>
        <p><strong>Duration:</strong> ${service.duration}</p>
        <p><strong>Price:</strong> ${service.price}</p>
        `;

    container.appendChild(card);

    const btn = card.querySelector('.favorite-btn');
    const serviceId = service.id;

    if (favorites.includes(serviceId)) {
      btn.classList.add('favorited');
      card.classList.add('favorite-card');
    }

    btn.addEventListener('click', () => {
      if (btn.classList.contains('favorited')) {
        btn.classList.remove('favorited');
        favorites = favorites.filter(id => id !== serviceId);
        card.classList.remove('favorite-card');
      } else {
        btn.classList.add('favorited');
        favorites.push(serviceId);
        card.classList.add('favorite-card');
      }
      saveFavorites();
    });
  });
}

async function init() {
  const services = await getServices();
  renderServices(services);
}

if (toggleFavoritesBtn) {
  toggleFavoritesBtn.addEventListener('click', () => {
    const showingFavorites = toggleFavoritesBtn.classList.toggle('showing-favorites');

    if (showingFavorites) {
      toggleFavoritesBtn.textContent = "Show All";
      container.querySelectorAll('.service-card').forEach(card => {
        if (!card.classList.contains('favorite-card')) {
          card.style.display = 'none';
        }
      });
    } else {
      toggleFavoritesBtn.textContent = "Show Favorites";
      container.querySelectorAll('.service-card').forEach(card => {
        card.style.display = '';
      });
    }
  });
}

    init();