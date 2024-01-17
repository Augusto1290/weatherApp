import { Weather } from './Weather'

const searchBarEl = document.querySelector('.search-bar')
const searchButtonEl = document.querySelector('.search button')

const { VITE_API_URL: url, VITE_API_KEY: key, VITE_API_HOST: host } = import.meta.env

const weather = new Weather(url, key, host)

weather.fetchWeather()

searchButtonEl.addEventListener('click', function () {
  weather.search(searchBarEl.value, () => {
    searchBarEl.value = ''
  })
})

searchBarEl.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    const { target } = event
    weather.search(target.value, () => {
      target.value = ''
    })
  }
})
