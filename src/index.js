import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const info = document.querySelector('.cat-info');

select.style.display = 'none';
info.style.display = 'none';

fetchBreeds()
  .then(value => {
    select.style.display = 'flex';
    select.innerHTML = creatOptionMurcup(value);
  })
  .catch(error => {
    console.log(error);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  })
  .finally(_ => (loader.style.display = 'none'));

function creatOptionMurcup(elements) {
  const result = elements.map(
    ({ id, name }) => `<option value = "${id}">
    ${name}
    </option>`
  );
  return result.join();
}

select.addEventListener('change', searchId);

function searchId(event) {
  loader.style.display = 'initial';
  info.style.display = 'flex';
  info.innerHTML = '';
  const breedId = event.target.value;
  console.log(breedId);
  fetchCatByBreed(breedId)
    .then(elements => {
      info.innerHTML = createCatMarkup(elements);
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(_ => (loader.style.display = 'none'));
}
// description temperament

function createCatMarkup(elements) {
  const { url, breeds } = elements[0];
  const { description, name, temperament } = breeds[0];
  return `<img class = "cat-img" src="${url}" alt="${name}">
<div class = "container"><h2>${name}</h2>
<p>${description}</p>
<p class = "text"><span >Temperament:</span>${temperament}</p></div>`;
}
