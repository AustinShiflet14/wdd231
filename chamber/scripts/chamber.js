// Copywrite year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent =
  `Last Modification: ${document.lastModified}`;

// Hamburger Menu  
const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// Directory Page Script
const membersContainer = document.getElementById('membersContainer');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

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

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    
    if (document.getElementById('membersContainer')) {
      displayMembers(members);
    }
    
    displaySpotlights(members);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displayMembers(members) {
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

function membershipLevelName(level) {
  switch(level) {
    case 1: return 'Member';
    case 2: return 'Silver';
    case 3: return 'Gold';
    default: return 'Unknown';
  }
}

if (gridViewBtn) {
  gridViewBtn.addEventListener('click', () => {
    if (membersContainer) {
      membersContainer.classList.add('grid');
      membersContainer.classList.remove('list');
    }
  });
}

if (listViewBtn) {
  listViewBtn.addEventListener('click', () => {
    if (membersContainer) {
      membersContainer.classList.add('list');
      membersContainer.classList.remove('grid');
    }
  });
}

function displaySpotlights(members) {
  const container = document.getElementById('spotlight');
  container.innerHTML = '';

  const eligibleMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

  const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

  const count = 3;
  const spotlights = shuffled.slice(0, count);

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

    container.appendChild(card);
  });
}

fetchMembers();