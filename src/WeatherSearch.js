import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ReactAnimatedWeather from 'react-animated-weather';

import "./Weather.css"
export default function WeatherSearch() {
    const [city, setCity] = useState();
    const [weather, setWeather] = useState({
        city: null,
        temp: null,
        desc: null,
        hum: null,
        wind: null,
        icon: null,

    });



    const [weatherIcon, setWeatherIcon] = useState("RAIN")


    const date = new Date()
    const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const time = date.toLocaleTimeString();

    const iconCode = useMemo(() => ({
        "01d": "CLEAR_DAY",
        "01n": "CLEAR_NIGHT",
        "02d": "PARTLY_CLOUDY_DAY",
        "02n": "PARTLY_CLOUDY_NIGHT",
        "03d": "CLOUDY",
        "03n": "CLOUDY",
        "04d": "CLOUDY",
        "04n": "CLOUDY",
        "09d": "RAIN",
        "09n": "RAIN",
        "10d": "RAIN",
        "10n": "RAIN",
        "11d": "RAIN",
        "11n": "RAIN",
        "13d": "SNOW",
        "13n": "SNOW",
        "50d": "FOG",
        "50n": "FOG",
      
    }), []);


    const apiKey = "8ca7dd4e61360b90fb66918853670e48";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`).then((response) => {
            console.log(response.data);
            setWeather({
                city: "London",
                temp: Math.round(response.data.main.temp),
                desc: response.data.weather[0].description,
                hum: response.data.main.humidity,
                wind: response.data.wind.speed,
                icon: response.data.weather[0].icon,
            });

            setWeatherIcon(iconCode[response.data.weather[0].icon]);
        });
    }, [iconCode])



    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const getCity = (e) => {
        e.preventDefault();
        try {
            axios.get(apiUrl).then((response) => {
                console.log(response.data);
                setWeather({
                    city: city,
                    temp: Math.round(response.data.main.temp),
                    desc: response.data.weather[0].description,
                    hum: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    icon: response.data.weather[0].icon,
                });

                setWeatherIcon(iconCode[response.data.weather[0].icon]);
            });
        } catch (error) {

            alert("Unable to fetch data.");
        }
    };


    const toCelsius = (e) => {
        e.preventDefault();
        if (weather.temp) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            ).then((response) => {

                const celsiusValue = Math.round(response.data.main.temp)
                setWeather({ ...weather, temp: celsiusValue });


            });


        }
    };

    const toFahrenheit = (e) => {
        e.preventDefault();
        if (weather.temp) {
            const fahrenheitValue = (Math.round(weather.temp * 9 / 5)) + 32;
            setWeather({ ...weather, temp: fahrenheitValue });

        }
    };


    return (
        <>
            <div className="container">

                <form onSubmit={getCity}>
                    <input
                        className="search"
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Enter a city..."
                    />
                    <input className="button" type="submit" value="Search" />
                </form>
                <div className="section-1">

                    <h4>{weather.city}</h4>
                    <p>{day[date.getDay() - 1]} {time}</p>
                    <p>{weather.desc}</p>

                </div>

                <div className="cont">
                    <div className="box1">
                        <h2>
                            <ReactAnimatedWeather
                                icon={weatherIcon}
                                size={64}

                            />
                            <span>{weather.temp}</span><sup><a href="abc.com" onClick={toCelsius}>C</a>|<a href="abc.com" onClick={toFahrenheit}>F</a></sup>
                        </h2>
                    </div>
                    <div className="box2">
                        <p>Humidity:{weather.hum}</p>
                        <p>Wind:{weather.wind}</p>

                    </div>
                </div>

            </div>
        </>
    );
}
