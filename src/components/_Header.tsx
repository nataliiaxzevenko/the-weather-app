import React from 'react';

const _Header = () => {
    return(
        <div id="stuck_container">
            <div className="header">
                <div className="row">
                    <h1 className="col">
                        <a href="#">
                            <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="WeatherInfo"></img>
                        </a>
                    </h1>
                    <div className="nav col">
                        <ul className="header_menu padding-top16">
                            <li className="current">
                                <a href="#">Forecast</a>
                            </li>
                            <li>
                                <a href="#">Surf Forecast</a>
                            </li>
                            <li>
                                <a href="#">Alerts</a>
                            </li>
                            <li id="last-li">
                                <a href="#">Climate Change</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default _Header;