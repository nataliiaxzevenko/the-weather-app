import React from 'react';
import DegreeToggle from './DegreeToggle';
import Geosuggest from 'react-geosuggest';

type SearchBarProps = {
    initialCity: string,
    onSuggestSelect: any
}

type SearchBarState = {
    searchTerm: any
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState>{
    geosuggestEl: React.RefObject<Geosuggest>;
    constructor(props: any){
        super(props);
        this.state = {
            searchTerm: null
        }
        this.geosuggestEl = React.createRef();
    }

    onSuggestSelect = (suggest: any) => {
        const city = suggest && suggest.gmaps ? suggest.gmaps.formatted_address.replace(/\d+$/, "") : "";
        this.setState({
            searchTerm: suggest
        }, () => console.log(this.state))
    }

    render(){
        const fixtures = [
            {label: 'Seattle, WA, USA'},
            {label: 'Kiev, Ukraine'},
            {label: 'New York, NY, USA'}
        ];

        return (
            <div>
                <Geosuggest
                    ref={this.geosuggestEl}
                    placeholder="Search new city..."
                    initialValue={this.props.initialCity}
                    fixtures={fixtures}
                    onSuggestSelect={this.props.onSuggestSelect}
                    location={new google.maps.LatLng(47.6062, 122.3321)}
                    radius={20} />
            </div>
        )
    }
}

export default SearchBar;