import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Forecast.css"

export default function Forecast({ city }) {
    const key = "35af4obbb291a0548td82efb8ee6a91e";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}`;
    let [data, setData] = useState([])



    useEffect(() => {

        try {
            axios.get(apiUrl).then((response) => {
                console.log(response.data)

                let daily = response.data.daily
                console.log(daily)
                let newData = [];

                try {
                    daily.forEach((element, index) => {
                        if (index < 5) {
                            let day = new Date((element.time) * 1000).toLocaleDateString("en-US", { weekday: 'short' });
                            let icon = element.condition.icon_url
                            let min = Math.round(element.temperature.minimum)
                            let max = Math.round(element.temperature.maximum)

                            newData.push({ day: day, icon: icon, min: min, max: max })
                        }

                    });

                    setData(newData)

                    console.log(data)
                } catch (error) {

                    alert("City not found!")

                }



            }).catch(error)
            {

                alert("Unable to fetch data.")
            }


        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }


    }, [city, apiUrl]);

    if (data.length > 0) {
        return (
            <>

                <div className="forecast-container">
                    {data.map((item, index) => (
                        <div className="box1" key={index}>
                            <p>{item.day}</p>
                            <img src={item.icon} alt={`Weather icon for ${item.day}`} />
                            <p><span>{item.min}°C</span> <span className="max">{item.max}°C</span>
                            </p>
                        </div>
                    ))}
                </div>
            </>
        );
    } else {
        return <h5 className="load">Loading...</h5>;
    }
}


