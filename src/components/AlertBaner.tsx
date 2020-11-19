import React, {useState} from 'react';
var moment = require('moment');

const AlertBaner = (props: any) => {
    let startDate = new Date(props.reading.start * 1000);
    let endDate = new Date(props.reading.end * 1000);
    const [showDescription, setShowDescription] = useState(false);

    const learnMoreToggle = () =>{
        setShowDescription(true);
    }

return (
    <div className="col-sm-10 margine-bottom">
      <div className="card alert-card">
      <h3 className="card-header">Alert!</h3>
        <h5 className="card-title">{props.reading.event}</h5>
        {!showDescription ? <a onClick={learnMoreToggle} >Learn More...</a> : null}
        {showDescription ? 
        <div className="row">
            <div className="col">
                <p>{props.reading.description}</p>
            </div>
        </div> : null}
      </div>
    </div>
)
}

export default AlertBaner;