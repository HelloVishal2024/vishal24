import React, {useState, useEffect} from 'react'
import './DateTime.css';
import cloudy from './assets/cloudy.png';
import axios from "axios";

export const DateTime = () => {

    const api = {
        key: "bb0de806ce94d88d0d164a1a01656c8a",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    var [date, setDate] = useState(new Date());
    const [temp, setTemp] = useState(null);

    useEffect(() => {
        getClimate();
    }, [])

    useEffect(() => {}, [temp])

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    });

    const getClimate = () => {
        axios.get(`${api.base}weather?q=chennai&units=metric&APPID=${api.key}`)
            .then((data) => {
                setTemp(data.data.main.temp)
            })
            .catch((err) => console.log(err))
    }


    const dateoptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: undefined, minute: undefined, second: undefined };
    const dateString = new Intl.DateTimeFormat("en-IN", dateoptions).format(date);

    const options = {hour: 'numeric', minute: '2-digit', hour12: false};
    const timeString = date.toLocaleTimeString("en-IN", options);


    return (
        <div>
            <p className={"timeStringcss"}> {timeString}</p>
            <p className={"dateStringcss"}> {dateString}</p>
            <div style={{display: "inline-flex"}}>
                <img src={cloudy} alt={"weather"} height={"20px"} width={"20px"}/>
                <p className={"degStringcss"}>{temp}<span>&#176;C</span></p>
            </div>
        </div>
    )
}

export default DateTime;