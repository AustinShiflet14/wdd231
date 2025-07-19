const myDescription = document.getElementById('description');
const myTemperature = document.getElementById('temperature');
const myGraphic = document.getElementById('graphic');
const myTown = document.getElementById('town');

const myKey = "3788e11a177ff67859dcd39256c1557a"
const myLat = "49.75"
const myLon = "6.64"

const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`

async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(data) {
  myDescription.innerHTML = data.weather[0].description;
  myTemperature.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  myGraphic.setAttribute('src', iconsrc);
  myGraphic.setAttribute('alt', data.weather[0].description);
}

apiFetch();