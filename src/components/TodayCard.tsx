import React from 'react';
var moment = require('moment');

const TodayCard = (props: any) => {
    let newDate = new Date();
    const weekday = props.reading.dt * 1000;
    newDate.setTime(weekday);

    const fahrenheit = Math.round(props.reading.temp);
    const celsius = Math.round((fahrenheit - 32) * 5/9); 

    let sunrise = new Date(props.reading.sunrise * 1000);
    let sunset = new Date(props.reading.sunset * 1000);

    const weatherImg = "wi wi-owm-"+props.reading.weather[0].id+" owf-4x margine-bottom";

return (
    <div className="col-sm-10 margine-bottom">
      <div className="card">
        <h3 className="card-header">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <div className="row">
            <div className="col">
                <i className={weatherImg}></i>
                <h2>{props.degreeType === 'metric' ? celsius+"°C" : fahrenheit+"°F"}</h2>
                <div className="card-body">
                    <p className="card-text">{props.reading.weather[0].description}</p>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    <h5>Wind:  {props.reading.wind_speed} miles/hour</h5>
                </div>
                <div className="row">
                    <h5>Humidity:  {props.reading.humidity} %</h5>
                </div>
                <div className="row sun-icons" style={{alignItems: 'start'}}>
                    <div className="col">
                        <i className="wi wi-sunrise owf-2x"></i>
                        <p>{moment(sunrise).format('h:mm a')}</p>
                    </div>
                    <div className="col">
                        <i className="wi wi-sunset owf-2x"></i>
                        <p>{moment(sunset).format('h:mm a')}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
)
}

export default TodayCard;