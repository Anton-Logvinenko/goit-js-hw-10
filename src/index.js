import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const listEL = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));
function onInputEl(evt) {
  const nameValue = evt.target.value;
  const nameCountry = nameValue.trim();

  if (!nameCountry) {
    return (listEL.innerHTML = '');
  }
  fetchCountries(nameCountry)
    .then(data => {
      console.log(data);
      createMarcup(data);
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function createMarcup(arr) {
  if (arr.length >= 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  const marcup = arr
    .map(({ name, capital, population, flags: { svg }, languages }) => {
      if (arr.length >= 2 && arr.length <= 9) {
        return `<li>
  <div class="box-name">
  <img src="${svg}" alt="${name}" width ='30', height ='20' />
  <p class= "title-name"><b> ${name}</b></p>
  </div>
</li>`;
      }
      return `<li>
    <div class="box-name">
    <img src="${svg}" alt="${name}" width ='30', height ='20' />
    <p class= "title-name"><b> ${name}</b></p>
    </div> 
    <p><b>Capital:</b> ${capital} </p>
    <p><b>Population:</b> ${new Intl.NumberFormat().format(population)} </p>
    <p><b>Languages: ${languages.map(el => el.name)}</p>
  </li>`;
    })
    .join('');

  listEL.innerHTML = marcup;
}
