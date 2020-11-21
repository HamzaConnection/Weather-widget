import React from 'react'


export default class ErrorPage extends React.Component {
    render() {
        return <div>
            <h1>Error: Please enter a valid city the given city "{this.props.city}"
      is not a valid city </h1>
            <button><a href="/">Click here to go back to the Weather Widget</a></button>

        </div>;
    }
}