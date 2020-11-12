import React from 'react';
var moment = require('moment');

const TodayCard = (props: any) => {
    let newDate = new Date();
    const weekday = props.reading.dt * 1000;
    console.log('[today week day]', weekday);
    newDate.setTime(weekday);

    const fahrenheit = Math.round(props.reading.main.temp);
    const celsius = Math.round((fahrenheit - 32) * 5/9); 

    let imgURL: string = "owf owf-" + props.reading.weather[0].id + " owf-5x";
return (
    <div className="col-sm-10 margine-bottom">
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

export default TodayCard;