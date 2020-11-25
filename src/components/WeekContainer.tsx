import React from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import TodayCard from './TodayCard';
import Alert from './AlertBaner';
import _Header from './_Header';
import SearchBar from './SearchBar';

type WeekContainerState = {
    fullData: any[],
    dailyData: any[],
    todayData: any,
    degreeType: string,
    searchTerm: any,
    initialCity: string,
    alertData: any
}

class WeekContainer extends React.Component<{}, WeekContainerState>{
    constructor(props: any){
        super(props);
        this.state = {
            fullData: [],
            dailyData: [],
            todayData: null,
            degreeType: "imperial",
            searchTerm: null,
            initialCity: "Seattle, WA, USA",
            alertData: null
        }
    }

    updateDegree = (e: any) =>{
        this.setState({
            degreeType: e.target.value
        })
    }

    onLoadData = () =>{
        let lat = this.state.searchTerm && this.state.searchTerm.location ? this.state.searchTerm.location.lat : 47.6062;
        let lng = this.state.searchTerm && this.state.searchTerm.location ? this.state.searchTerm.location.lng : 122.3321;
        lat = Math.abs(lat.toFixed(4));
        lng = Math.abs(lng.toFixed(4));
        const weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&exclude=minutely&units=imperial&appid=" + process.env.REACT_APP_OWM_API_KEY;
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
            const dailyData = data.daily.slice(1, 6); 
            const todayData = data.current;
            const alertData = data.alerts ? data.alerts : null;
            // const alertData = {
            //     "sender_name": "NWS Tulsa (Eastern Oklahoma)",
            //     "event": "Heat Advisory",
            //     "start": 1597341600,
            //     "end": 1597366800,
            //     "description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible."
            //   }
            this.setState({
                fullData: data,
                dailyData: dailyData,
                todayData: todayData,
                alertData: alertData
            }, () => console.log(this.state));
        })
        .catch(error => console.error('Error', error));;
    }

    componentDidMount = () => {
        this.onLoadData();
    }

    onSuggestSelect = (suggest: any) => {
        const city = suggest && suggest.gmaps ? suggest.gmaps.formatted_address.replace(/\d+$/, "") : "";
        this.setState({
            searchTerm: suggest,
            initialCity: city
        }, () => console.log(this.state));
        this.onLoadData();
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
            <TodayCard reading={this.state.todayData} degreeType={this.state.degreeType} />
        );
        } else {
                return <h2>Loading...</h2>;
        }
    }

    render(){
        return (
            <div>
                <_Header />
                <div className="container">
                    <SearchBar initialCity={this.state.initialCity} onSuggestSelect={this.onSuggestSelect} />
                    <h5 className="display-5 text-muted">{this.state.initialCity}</h5>
                    <DegreeToggle degreeType={this.state.degreeType} updateDegree={(event: any) => this.updateDegree(event)}/>
                    <div className="row justify-content-center">
                        {this.todayCard()}
                    </div>
                    <div className="row justify-content-center">
                        {this.dayCards()}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeekContainer;