import React, { Component } from 'react'

import Header from './Header'
import Weather from './Weather'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import '../components/App.css'

import ReactAnimatedWeather from 'react-animated-weather'

const defaults = {
    icon: "",
    color: '#630b2b',
    size: 100,
    animate: true
  }

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            city: "",
            userInput: "",
            temp: null,
            description: "",
            id: null,
            hours: null,
            date: "",
            weatherIcon: false,
            errorMessage: false
        }
    }
    // Get Weather data from Open Weather and save to state
    getWeatherData = (event) => {
        event.preventDefault()

        const url = 'https://api.openweathermap.org/data/2.5/weather?'
        const appid = 'ccaca0e70f2b1ef5f633bc7b22f9d499'
        const units = 'imperial'
        const cityState = this.state.userInput
        fetch(`${url}q=${cityState},US&units=${units}&appid=${appid}`)
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
                city: data.name,
                temp: data.main.temp,
                description: data.weather[0].description,
                id: data.weather[0].id,
                hours: this.getDate(data.timezone).getHours(),
                date: this.getDate(data.timezone).toLocaleTimeString()
            }, () => {
                this.getIcon(this.state.id, this.state.hours)
            }))
            .catch((error) => {
                this.setState({
                    weatherIcon: false,
                    errorMessage: 'Sorry, the specified city was not found.'
                })
            })
            // .then(data => console.log(data))
    }

    // Get name of city from user input
    getCity = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value})
    }

    getIcon = (id, hours) => {
        const isDayTime = hours > 6 && hours < 20
        const isNightTime = hours < 6 && hours > 20

        switch (true) {
            case (id === 800 && isDayTime):
                defaults.icon = 'CLEAR_DAY'
                this.setState({weatherIcon: true, errorMessage: false})
                break
            case (id === 800 && isNightTime):
                defaults.icon = 'CLEAR_NIGHT'
                this.setState({weatherIcon: true, errorMessage: false})
                break
            case (id >= 802 && id <= 804):
                defaults.icon = 'CLOUDY'
                this.setState({weatherIcon: true, errorMessage: false})
                break
            case (id === 801 && isDayTime):
                defaults.icon = 'PARTLY_CLOUDY_DAY'
                this.setState({weatherIcon: true, errorMessage: false})
                break
            case (id === 801 && isNightTime):
                defaults.icon = 'PARTLY_CLOUDY_NIGHT'
                this.setState({weatherIcon: true, errorMessage: false})
                break
            case (id >= 701 && id <=781):
                defaults.icon = 'FOG'
                this.setState({weatherIcon: true, errorMessage: false})
                break
            case (id >= 600 && id <= 622):
                defaults.icon = 'SNOW'
                this.setState({weatherIcon: true, errorMessage: false})
                break
            case (id >= 300 && id <= 531):
                defaults.icon = 'RAIN'
                this.setState({weatherIcon: true, errorMessage: false})
                break
            default:
                console.log('something went wrong')
                break
        }
   
    }

    getDate = (timezone) => {
        let d = new Date()
        let localTime = d.getTime()
        let localOffset = d.getTimezoneOffset() * 60000
        let utc = localTime + localOffset
        let city = utc + (1000 * timezone)
        let nd = new Date(city)
        
        return nd
    }

    render() {
        const { userInput, temp, date, description, weatherIcon, errorMessage } = this.state
        
        return (
            <>
                <Header />
                <div>
                    <Weather 
                        getWeatherData={ this.getWeatherData }
                        value1={ userInput }
                        getCity={ this.getCity }
                    />
                    { weatherIcon  ?
                        <div className="current-weather-container">
                            <ReactAnimatedWeather
                                icon={defaults.icon}
                                color={defaults.color}
                                size={defaults.size}
                                animate={defaults.animate}
                            /> 
                            <h1 className="degrees">{ temp }<span>&#176;</span></h1>
                            <h1 className="descripton">{ description }</h1>
                            <h1 className="date">{ date }</h1>
                            <h1>{ this.state.time }</h1>
                        </div>
                        :
                      errorMessage ?
                        <div className="error-message">
                            <p><i className="fa fa-frown-o fa-2x"></i>{ errorMessage }</p>
                        </div>
                        : null
                    }
                </div>
            </>
        )
    }
}

export default App
