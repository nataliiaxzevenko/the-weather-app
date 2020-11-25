import React from 'react';
var moment = require('moment');

const DayCard = (props: any) => {
    let newDate = new Date();
    const weekday = props.reading.dt * 1000;
    newDate.setTime(weekday);

    const fahrenheit = Math.round(props.reading.temp.day);
    const celsius = Math.round((fahrenheit - 32) * 5/9); 

    let imgURL: string = "wi wi-owm-"+props.reading.weather[0].id+" owf-4x margin-bottom";
return (
    <div className="col-sm-2">
      <div className="card">
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <i className={imgURL}></i>
        <h2>{props.degreeType === 'metric' ? celsius+"°C" : fahrenheit+"°F"}</h2>
        <div className="card-body">
          <p className="card-text">{props.reading.weather[0].description}</p>
        </div>
      </div>
    </div>
)
}

export default DayCard;