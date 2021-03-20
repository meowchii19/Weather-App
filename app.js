
//getting the api

const api_key = '6288011b1f1544e380325c2e1cda0dbe'
const base = 'https://api.openweathermap.org/data/2.5/'

const search = document.querySelector('[data-search]')
const container = document.querySelector('.container')
search.addEventListener('keypress', searchQuery)

//if presses enter 
function searchQuery(e) {
  if(e.keyCode == 13)
  getResult(search.value)
}


// getting the search query from search bar
function getResult(query) {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api_key}`)
    .then(weather => {
      return weather.json()
    }).then(displayResults)
  search.value = ''
}



//displaying the results based on weather
function displayResults(weather) {

  let temp = weather.main.temp
  let currentWeather = weather.weather[0].main
  let country = weather.sys.country
  let city = weather.name
  let date = new Date()
  createElement(temp, currentWeather, city, country)
}


//creating elements to DOM
function createElement(temp, currentWeather, cityName, countryName) {
    
    const section = document.createElement('section')
    section.classList.add('location')
    
    //making empty string whatever is in the page before searching
    const content = document.querySelector('.content') 
    content.innerHTML = ''

    const city = document.createElement('div')  
    city.classList.add('city')
    city.innerHTML = `${cityName} ${countryName}`

    const date = document.createElement('div')
    date.classList.add('date')
    date.innerHTML = getDate()


    const tempDiv = document.createElement('div')
    let wholeNum = Math.floor(temp)
    tempDiv.classList.add('temp')
    tempDiv.innerHTML = `${wholeNum} <span></span>&#176;c`

    const weather = document.createElement('div')
    weather.classList.add
    weather.classList.add(currentWeather)
    weather.innerHTML = `${currentWeather}`

    section.appendChild(city)
    section.appendChild(date)
    content.appendChild(section)    
    content.appendChild(tempDiv)
    content.appendChild(weather)

    bgChanger(currentWeather)
}

const weather  = document.querySelector('.__weather')
weather.classList.add('clouds')

// changes bg based on weather
function bgChanger(currentWeather) {


  if(currentWeather === 'Clouds')  {
    weather.classList.remove('rain')
    weather.classList.remove('clear')
    weather.classList.add('clouds')
    console.log('clouds')

  }

  else if(currentWeather === 'Rain') {
    weather.classList.remove('sunny')
    weather.classList.remove('clouds')
    weather.classList.add('rain')
    console.log('rain')
  }
  else {    
    weather.classList.remove('clouds')
    weather.classList.remove('rain')
    weather.classList.add('clear')
    console.log('clear')

  }
}

//getting date today
function getDate () {

  const months = [
                  "January", 
                  "February", 
                  "March",
                  "April",
                  "May",
                  "June", 
                  "July", 
                  "August", 
                  "September", 
                  "October", 
                  "November", 
                  "December"

                  ];


  const days = [
                "Sun",
                "Mon",
                "Tues",
                "Wed",
                "thurs",
                "Fri",
                "Sat"
              ];



  const d = new Date()

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()


  return `${day} ${date} ${month} ${year}`
}



