import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Forecast.css";

export default function Forecast({ city }) {
    const key = "35af4obbb291a0548td82efb8ee6a91e";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}`;
    const [data, setData] = useState([]);

    useEffect(() => {
        let isMounted = true; // Flag to track component mount status

        axios.get(apiUrl).then((response) => {
            if (isMounted) {
                console.log(response.data);

                const daily = response.data.daily;
                const newData = [];

                daily.forEach((element, index) => {
                    if (index < 5) {
                        const day = new Date(element.time * 1000).toLocaleDateString("en-US", {
                            weekday: "short"
                        });
                        const icon = element.condition.icon_url;
                        const min = Math.round(element.temperature.minimum);
                        const max = Math.round(element.temperature.maximum);

                        newData.push({ day, icon, min, max });
                    }
                });

                setData(newData);
            }
        }).catch((error) => {
            console.error("Error fetching forecast data:", error);
            alert("Unable to fetch forecast data.");
        });

        // Cleanup function to handle component unmounting
        return () => {
            isMounted = false;
        };
    }, [city, apiUrl]);

    if (data.length > 0) {
        return (
            <div className="forecast-container">
                {data.map((item, index) => (
                    <div className="box1" key={index}>
                        <p>{item.day}</p>
                        <img src={item.icon} alt={`Weather icon for ${item.day}`} />
                        <p>
                            <span>{item.min}°C</span>{" "}
                            <span className="max">{item.max}°C</span>
                        </p>
                    </div>
                ))}
            </div>
        );
    } else {
        return <h5 className="load">Loading...</h5>;
    }
}
