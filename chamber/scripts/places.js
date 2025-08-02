import { places } from "../data/places.mjs";

const container = document.querySelector(".allplaces");

places.forEach(place => {
  const card = document.createElement("div");
  card.className = "place-card";

  card.innerHTML = `
    <img src="${place.photo_url}" alt="${place.name}">
    <h2>${place.name}</h2>
    <p>${place.description}</p>
    <address>${place.address}</address>
  `;

  container.appendChild(card);
});