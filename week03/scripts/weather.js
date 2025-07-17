const myDescription = document.getElementById('description');
const myTemperature = document.getElementById('temperature');
const myGraphic = document.getElementById('graphic');

const myKey = "3788e11a177ff67859dcd39256c1557a"
const myLat = "49.75"
const myLon = "6.64"

const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`

async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      // displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();