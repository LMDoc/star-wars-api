let url = "https://swapi.co/api/people/1/";
let name = document.querySelector('#name');
let height = document.querySelector('#height');
let gender = document.querySelector('#gender');
let home = document.querySelector('#home');
let homePop = document.querySelector('#homePop');
let movies = document.querySelector('#movies');
let charSpecies = document.querySelector('#charSpecies');
let form = document.querySelector('form');
let input = document.querySelector('#searchTerm');
let birthYear = document.querySelector('#birthYear');

document.querySelector('form').addEventListener("submit", search)

fetchData(url);
let person;
let world;
let species;

function fetchData(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => person = data)
  .then(getFilms)
  .then(data => fetch(person.homeworld))
  .then(res => res.json())
  .then(data => world = data)
  .then(data => fetch(person.species))
  .then(res => res.json())
  .then(data => species = data)
  .then(update)
  .catch(err => console.log('Request failed', err))
}

function getFilms(data) {
   Promise.all(data.films.map(url =>
     fetch(url)
     .then(resp => resp.json())
   )).then(data => data.forEach(i => movies.innerHTML += `<li>${i.title}</li>`))
     .catch(err => console.log('Request failed', err))
}

function update(data){
  name.innerHTML = person.name.toUpperCase();
   birthYear.innerHTML = person.birth_year == "unknown" ? `<b>Born:</b> Unknown` : `<b>Born:</b> ${person.birth_year[0].toUpperCase()}${person.birth_year.slice(1)}`
   height.innerHTML = person.height == "unknown" ? `Height: Unknown` : `<b>Height:</b> ${person.height}cm`;
   gender.innerHTML = `<b>Gender:</b> ${person.gender[0].toUpperCase()}${person.gender.slice(1)}`
   home.innerHTML = world.name == "unknown" ? `${world.name[0].toUpperCase()}${world.name.slice(1)}` : `${world.name[0].toUpperCase()}${world.name.slice(1)}(Population: ${Number(world.population).toLocaleString()})`;
   homeClimate.innerHTML = `<b>Climate:</b> ${world.climate[0].toUpperCase()}${world.climate.slice(1)}`
   charSpecies.innerHTML = `<b>Species:</b> ${species.name}`
}

function search(e) {
   let searchURL = `https://swapi.co/api/people/?search=${input.value}`;
   e.preventDefault();

   fetch(searchURL)
   .then(res => res.json())
   .then(data => url = data.results[0].url)
   .then(fetchData)
   .then(input.value = '')
   .then(movies.innerHTML = '')
   .then(input.value = '')
}