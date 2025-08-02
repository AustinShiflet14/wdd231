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
    <a href="${place.link}" target="_blank">Learn More!</a>
  `;

  container.appendChild(card);
});

// local storage part
const messageBox = document.getElementById("visit-message");

const today = new Date();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
  messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const lastDate = new Date(lastVisit);
  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    messageBox.textContent = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    messageBox.textContent = "You last visited 1 day ago.";
  } else {
    messageBox.textContent = `You last visited ${diffDays} days ago.`;
  }
}

// Save today's date for next visit
localStorage.setItem("lastVisit", today.toISOString());