import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ReactAnimatedWeather from 'react-animated-weather';
import { Bars } from 'react-loader-spinner';
import "./Weather.css";
import Forecast from "./Forecast";

export default function WeatherSearch() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({
        city: null,
        temp: null,
        desc: null,
        hum: null,
        wind: null,
        icon: null,
    });
    const [passCity, setPassCity] = useState("London");
    const [weatherIcon, setWeatherIcon] = useState("RAIN");
    const apiKey = "8ca7dd4e61360b90fb66918853670e48";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const date = new Date();
    const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`)
            .then((response) => {
                setWeather({
                    city: "London",
                    temp: Math.round(response.data.main.temp),
                    desc: response.data.weather[0].description,
                    hum: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    icon: response.data.weather[0].icon,
                });
                setWeatherIcon(iconCode[response.data.weather[0].icon]);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                alert("Unable to fetch weather data for London.");
            });
    }, [iconCode]);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const getCity = (e) => {
        e.preventDefault();
        axios.get(apiUrl)
            .then((response) => {
                setWeather({
                    city: city,
                    temp: Math.round(response.data.main.temp),
                    desc: response.data.weather[0].description,
                    hum: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    icon: response.data.weather[0].icon,
                });
                setWeatherIcon(iconCode[response.data.weather[0].icon]);
                setPassCity(city);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                alert(`Unable to fetch weather data for ${city}.`);
            });
    };

    const toCelsius = (e) => {
        e.preventDefault();
        if (weather.temp) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                .then((response) => {
                    const celsiusValue = Math.round(response.data.main.temp);
                    setWeather({ ...weather, temp: celsiusValue });
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                    alert(`Unable to fetch weather data for ${city}.`);
                });
        }
    };

    const toFahrenheit = (e) => {
        e.preventDefault();
        if (weather.temp) {
            const fahrenheitValue = Math.round(weather.temp * 9 / 5) + 32;
            setWeather({ ...weather, temp: fahrenheitValue });
        }
    };

    if (!weather.city || !weather.temp || !weather.desc || !weather.hum || !weather.wind || !weather.icon) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Bars
                    height={80}
                    width={80}
                    color="rgb(197, 91, 91)"
                    ariaLabel="bars-loading"
                    visible={true}
                />
            </div>
        );
    } else {
        return (
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
                <div className="cont">
                    <div className="box1">
                        <h4>{weather.city}</h4>
                        <p>{day[date.getDay() - 1]} {time}, {weather.desc}</p>
                        <p>Humidity: {weather.hum}%, Wind: {weather.wind}</p>
                    </div>
                    <div className="box2">
                        <h2 className="weather-info">
                            <ReactAnimatedWeather
                                icon={weatherIcon}
                                size={64}
                            />
                            <span className="weather-temp">{weather.temp}</span>
                            <sup className="temp-toggle">
                                <a href="abc.com" onClick={toCelsius}>C</a>|<a href="abc.com" onClick={toFahrenheit}>F</a>
                            </sup>
                        </h2>
                    </div>
                </div>
                <Forecast city={passCity} />
                <hr />
                <p className="desc">This project was coded by <a href="https://github.com/meklithab">Meklit Habtamu</a> open sourced on <a href="https://github.com/meklithab/weather-search-react">Github</a> and hosted on <a href="https://weather-search-reactjs.netlify.app/">Netlify</a>.</p>
            </div>
        );
    }
}
