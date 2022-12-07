import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const countryName = e.target.value.trim();

  fetchCountries(countryName).then(data => {
    if (!countryName) {
      countryList.innerHTML = '';
    } else if (data.length >= 2 && data.length <= 10) {
      countryList.innerHTML = '';
      createMurkupList(data);
    } else if (data.length == 1) {
      countryList.innerHTML = '';
      createMurkupCard(data);
    } else data.length > 10;
    Notify.info('Too many matches found. Please enter a more specific name.');
  });
}

function createMurkupList(arr) {
  const list = arr
    .map(({ flags, name }) => {
      return `<li class = 'country-item'>
    <img srs ="${flags.svg}" alt ="${name.official}" width = "20x" height ="20px">
    <p class = "country-name"> ${name.official}</p>
    </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', list);
}
function createMurkupCard(arr) {
  const list = arr
    .map(({ name, capital, population, flags, languages }) => {
      return ` <div class = "title">
  <li class = 'country-item'>
  <img srs ="${flags.svg}" alt ="${name.official}" width = "40x" height ="40px">
  <p class = "country-name"> ${name.official}</p>
  </li>
    </div>`;
    })
    .join('');
}
