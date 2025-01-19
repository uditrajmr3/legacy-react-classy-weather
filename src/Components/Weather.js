import React from "react";
import Day from "./Day";

export default class Weather extends React.Component {
  render() {
    const { weather, displayLocation } = this.props;
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = weather;

    return (
      <div>
        <h2>Weather {displayLocation}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              key={date}
              date={date}
              max={max.at(i)}
              min={min.at(i)}
              code={codes.at(i)}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}
