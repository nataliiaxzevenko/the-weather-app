import React from 'react';
import apiConfig from '../apiKeys';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import TodayCard from './TodayCard';

class WeekContainer extends React.Component{
    state = {
        fullData: [],
        dailyData: [],
        todayData: null,
        degreeType: "imperial"
    }

    updateDegree = (e: any) =>{
        this.setState({
            degreeType: e.target.value
        })
    }
    componentDidMount = () => {
        const weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=47.6062&lon=122.3321&exclude=alerts,minutely&units=imperial&appid=" + apiConfig.forecastKey;
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
            const dailyData = data.daily.slice(1, 6); 
            const todayData = data.current;
            this.setState({
                fullData: data,
                dailyData: dailyData,
                todayData: todayData
            }, () => console.log(this.state));
        });
    }

    dayCards = () => {
        return this.state.dailyData.map((r, index) => 
        <DayCard 
            key={index} 
            reading={r} 
            index={index}
            degreeType={this.state.degreeType} />);
    }

    todayCard = () => {
        if(this.state.todayData !== null) {
            return (
            <TodayCard reading={this.state.todayData} degreeType={this.state.degreeType}/>
        );
    } else {
            return <h2>Loading...</h2>;
    }
    }

    render(){
        return (
            <div className="container">
                <h1 className="display-4 jumbotron">The Weather Forecast</h1>
                <h5 className="display-5 text-muted">Seattle, WA</h5>
                <DegreeToggle degreeType={this.state.degreeType} updateDegree={(event: any) => this.updateDegree(event)}/>
                <div className="row justify-content-center">
                    {this.todayCard()}
                </div>
                <div className="row justify-content-center">
                    {this.dayCards()}
                </div>
            </div>
        )
    }
}

export default WeekContainer;