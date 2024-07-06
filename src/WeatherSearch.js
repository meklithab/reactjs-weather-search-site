import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({
        temp: null,
        desc: null,
        hum: null,
        wind: null,
        icon: null,
        
    });

    const apiKey = "8ca7dd4e61360b90fb66918853670e48";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const getCity = (e) => {
        e.preventDefault();
        try {
            axios.get(apiUrl).then((response) => {
                console.log(response.data);
                setWeather({
                    temp: response.data.main.temp,
                    desc: response.data.weather[0].description,
                    hum: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    icon: response.data.weather[0].icon,
                });
            });
        } catch (error) {
            alert("Unable to fetch data.");
        }
    };

    function displayData() {
        console.log(weather);
        return (
            <ul>
                <li>Temperature: {weather.temp}</li>
                <li>Description: {weather.desc}</li>
                <li>Humidity: {weather.hum}</li>
                <li>Wind: {weather.wind}</li>
                <li>
                    <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
                </li>
            </ul>
        );
    }

    return (
        <>
            <form onSubmit={getCity}>
                <input
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Enter a city..."
                />
                <input type="submit" value="Search" />
            </form>
            {weather.temp !== null && displayData()}
        </>
    );
}
