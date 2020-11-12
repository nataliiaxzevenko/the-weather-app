import React from 'react';
import apiConfig from '../apiKeys';
import DayCard from './DayCard';

class WeekContainer extends React.Component{
    state = {
        fullData: [],
        dailyData: []
    }

    componentDidMount = () => {
        const weatherURL = "http://api.openweathermap.org/data/2.5/forecast?zip=98134,us&APPID=" + apiConfig.forecastKey;
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
            const dailyData = data.list.filter((r: any) => r.dt_txt.includes("18:00:00"));
            this.setState({
                fullData: data.list,
                dailyData: dailyData
            }, () => console.log(this.state));
        });
    }

    dayCards = () => {
        return this.state.dailyData.map((r, index) => 
        <DayCard 
            key={index} 
            reading={r} 
            index={index}>
        </DayCard>);
    }

    render(){
        return (
            <div className="container">
                <h1 className="display-4 jumbotron">The Weather Forecast</h1>
                <h5 className="display-5 text-muted">Seattle, WA</h5>
                <div className="row justify-content-center">
                    {this.dayCards()}
                </div>
            </div>
        )
    }
}

export default WeekContainer;