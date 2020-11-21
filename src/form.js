import React from "react";
import convertFahrenheitToCelsisus from "./Converters/fahrenheit_to_Celsisus"
import degToCompass from "./Converters/degress_to_compass"
import ErrorPage from "./error_page"

const appid = "166d00e26d3ff2c6149e89feccc5c59a"; // bad security

function getCity() {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get('city')
  return city;
}

function handleErrors(res) {
  if (!res.ok) {
    throw new Error(res.error);
 }
 return res;
}







export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      city: "Copenhagen",
      temperature: "",
      humidity: "",
      windSpeed: "",
      windDegree: ""

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }




  componentDidMount() {
    if (getCity() == null) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},dk&appid=${appid}`)
      .then(res => handleErrors(res))  
      .then(result => result.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              city: result.name,
              temperature: result.main.temp,
              humidity: result.main.humidity,
              windSpeed: result.wind.speed,
              windDegree: result.wind.deg
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in the request being made.
          (error) => {
            this.setState({
              isLoaded: true,
              error: true
            });
          }
        )
    } else {

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${getCity()},dk&appid=${appid}`)
        .then(res => handleErrors(res))
        .then(result => result.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              city: result.name,
              temperature: result.main.temp,
              humidity: result.main.humidity,
              windSpeed: result.wind.speed,
              windDegree: result.wind.deg
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error: true
            });
          }
        )
    }
  }


  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.history.pushState('', '', '/?city=' + this.state.city);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${getCity()},dk&appid=${appid}`)
      .then(res =>
        handleErrors(res)
      )
      .then(res =>
        res.json()
      )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
              city: result.name,
              temperature: result.main.temp,
              humidity: result.main.humidity,
              windSpeed: result.wind.speed,
              windDegree: result.wind.deg
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      )

  }


  render() {

    const widgetStyle = {
      margin: 10,
      width: 300

    }

    const { error, isLoaded } = this.state;
    if (error) {
      return <ErrorPage city={getCity()}/>
    } else if (!isLoaded) {

      return <div>Loading ...</div>
    }
    else {
      return (
          <div className="widget" style={widgetStyle}>
            <div className="panel panel-info">
              <div className="panel-heading">Weather in <b>{this.state.city}</b></div>
              <ul className="list-group">
                <li className="list-group-item">Temperature: <b>{convertFahrenheitToCelsisus(this.state.temperature)}°C</b></li>
                <li className="list-group-item">Humidity: <b>{this.state.humidity}</b></li>
                <li className="list-group-item">Wind: <b>{this.state.windSpeed} m/s {degToCompass(this.state.windDegree)}</b></li>
                <li className="list-group-item">
                  <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input type="text" className="form-control" id="city" name="city" placeholder="City" value={this.state.city} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-deafult">Search</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
      );
    }


  }

}


