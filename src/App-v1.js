import React from "react";
import convertToFlag from "./lib/utils/convertToFlag";
import Weather from "./Components/Weather";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Patna",
      isLoading: false,
      displayLocation: "",
      weather: {},
    };
    this.updateLocation = this.updateLocation.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  updateLocation(e) {
    this.setState((_) => {
      return { location: e.target.value };
    });
  }

  async fetchWeather() {
    try {
      const location = this.state.location;
      this.setState({ isLoading: true });

      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({
        weather: weatherData.daily,
      });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search from location..."
            value={this.state.location}
            onChange={(e) => this.updateLocation(e)}
          />
        </div>

        <button onClick={this.fetchWeather}>Get Weather</button>

        {this.state.isLoading && <p className="loader">Loading...</p>}

        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            displayLocation={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
