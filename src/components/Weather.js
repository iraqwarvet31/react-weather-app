import React from 'react'

const Weather = (props) => {
    return (
        <div className="input-form">
            <form onSubmit={ props.getWeatherData }>
                <input 
                    type="text"
                    name="userInput"
                    value1={ props.userInput }
                    onChange={ props.getCity }
                    placeholder="example: Los Angeles, CA"
                />

                <button>Get Weather!</button>
            </form>
        </div>
    )
}

export default Weather