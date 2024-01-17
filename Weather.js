const cityEl = document.querySelector('.city')
const iconEl = document.querySelector('.icon')
const descriptionEl = document.querySelector('.description')
const tempEl = document.querySelector('.temp')
const humidityEl = document.querySelector('.humidity')
const windEl = document.querySelector('.wind')
const weatherEl = document.querySelector('.weather')

const appEl = document.querySelector('#app')

export class Weather {
  constructor(apiUrl, apiKey, apiHost) {
    this._apiUrl = apiUrl
    this._apiKey = apiKey
    this._apiHost = apiHost
  }

  fetchWeather(city) {
    fetch(
      `${this._apiUrl}?q=${city || 'Buenos Aires'}`,
      {
        headers: {
          'x-rapidapi-key': this._apiKey,
          'x-rapidapi-host': this._apiHost
        }
      }
    )
      .then((response) => {
        if (!response.ok) {
          window.alert('No weather found.')
          throw new Error('No weather found.')
        }
        return response.json()
      })
      .then((data) => this.displayWeather(data))
  }

  displayWeather(data) {
    const { location, current } = data
    const { name, country } = location
    const { temp_c: temp, humidity, wind_kph: wind, condition } = current
    const { text, icon } = condition
    cityEl.innerText = `Weather in ${name}, ${country}`
    iconEl.src = icon
    iconEl.alt = `Weather: ${text}`
    descriptionEl.innerText = text
    tempEl.innerText = `${temp}°C`
    humidityEl.innerText = `Humidity: ${humidity}%`
    windEl.innerText = `Wind speed: ${wind} km/h`
    weatherEl.classList.remove('loading')
    appEl.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name} ${text}')`
  }

  search(value, cb) {
    this.fetchWeather(value)
    cb && cb()
  }
}
