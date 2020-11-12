import React from 'react';

const DegreeToggle = (props: any) => {
  return (
    <div>
    <div className="form-check form-check-inline">
        <input
            className="form-check-input"
            type="radio"
            name="degree-type"
            id="celsius"
            value="metric"
            checked={props.degreeType === "metric"}
            onChange={props.updateDegree}
        />
        <label className="form-check-label" htmlFor="celsius">Celsius</label>
    </div>
    <div className="form-check form-check-inline">
        <input
            className="form-check-input"
            type="radio"
            name="degree-type"
            id="farenheit"
            value="imperial"
            checked={props.degreeType === "imperial"}
            onChange={props.updateDegree}
        />
        <label className="form-check-label" htmlFor="farenheit">Farenheit</label>
      </div>
    </div>
  )
}

export default DegreeToggle;