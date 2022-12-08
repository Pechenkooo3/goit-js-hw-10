import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');
const countrySearch = document.querySelector('#search-box');
document.getElementById('search-box').focus();

const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const countryName = e.target.value.trim();
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  if (!countryName) {
    return;
  }

  fetchCountries(countryName)
    .then(country => {
      if (country.length > 10) {
        return notifyInfoMessage();
      }
      if (country.length > 1 && country.length < 10) {
        refs.countryList.innerHTML = createMurkupList(data);
      } else {
        refs.countryInfo.innerHTML = createMurkupCard(data);
      }
    })
    .catch(error => notifyFailureMessage());
}

function createMurkupList(arr) {
  return arr
    .map(country => {
      return `
        <li class="country__item">
        <img class="country__img" src="${country.flags.svg}" alt="${country.name}" width="80">
        <h2>${country.name.official}</h2>
        </li>`;
    })
    .join('');
}
function createMurkupCard(arr) {
  return arr
    .map(country => {
      return `<div class="country-wrapper">
        <img src="${country.flags.svg}" alt="${country.name}" width="160">
      <h2 class='country__title'>${country.name.official}</h2>
      <p class='country__descr'>Capital:<span> ${country.capital}</span></p>
      <p class='country__descr'>Polulation:<span> ${
        country.population
      }</span></p>
      <p class='country__descr'>Languages:<span> ${Object.values(
        country.languages
      )}</span></p></div>`;
    })
    .join('');
}

const notifyFailureMessage = () => {
  return Notify.failure('Oops, there is no country with that name');
};

const notifyInfoMessage = () => {
  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};
