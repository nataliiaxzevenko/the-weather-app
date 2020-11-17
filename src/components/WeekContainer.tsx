import React from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import TodayCard from './TodayCard';
import Geosuggest from 'react-geosuggest';

type WeekContainerState = {
    fullData: any[],
    dailyData: any[],
    todayData: any,
    degreeType: string,
    searchTerm: any,
    initialCity: string
}

class WeekContainer extends React.Component<{}, WeekContainerState>{
    geosuggestEl: React.RefObject<Geosuggest>;
    constructor(props: any){
        super(props);
        this.state = {
            fullData: [],
            dailyData: [],
            todayData: null,
            degreeType: "imperial",
            searchTerm: null,
            initialCity: "Seattle, WA, USA"
        }
        this.geosuggestEl = React.createRef();
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
        const weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&exclude=alerts,minutely&units=imperial&appid=" + process.env.REACT_APP_OWM_API_KEY;
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
        })
        .catch(error => console.error('Error', error));;
    }

    componentDidMount = () => {
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
            <TodayCard reading={this.state.todayData} degreeType={this.state.degreeType}/>
        );
        } else {
                return <h2>Loading...</h2>;
        }
    }
    onSuggestSelect = (suggest: any) => {
        const city = suggest && suggest.gmaps ? suggest.gmaps.formatted_address.replace(/\d+$/, "") : "";
        this.setState({
            searchTerm: suggest,
            initialCity: city
        }, () => console.log(this.state))
        this.onLoadData();
    }

    render(){
        const fixtures = [
            {label: 'Seattle, WA, USA'},
            {label: 'Kiev, Ukraine'},
            {label: 'New York, NY, USA'}
        ];

        return (
            <div className="container">
                <h1 className="display-4 jumbotron">The Weather Forecast</h1>
                <Geosuggest
                ref={this.geosuggestEl}
                placeholder="Search new city..."
                initialValue={this.state.initialCity}
                fixtures={fixtures}
                onSuggestSelect={this.onSuggestSelect}
                location={new google.maps.LatLng(47.6062, 122.3321)}
                radius={20} />
        <h5 className="display-5 text-muted">{this.state.initialCity}</h5>
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