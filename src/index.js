import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

// Class based components always extend React.Component
class App extends React.Component {
	// initializing the state
	state = { lat: null, errorMessage: '' }

	// loading data
	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			// setState will update component
			(position) => this.setState({ lat: position.coords.latitude }),
			(err) => this.setState({ errorMessage: err.message }),
		)
	}

	// regular function with if condtions so it will return component
	renderContent() {
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>
		}
		if (!this.state.errorMessage && this.state.lat) {
			return (
				<div>
					<SeasonDisplay lat={this.state.lat} />
				</div>
			)
		}
		return <Spinner message="Please accept location request" />
	}

	// rendering will happen here
	render() {
		return <div className="border red">{this.renderContent()}</div>
	}
}

// changing html file by #root
ReactDOM.render(<App />, document.querySelector('#root'))
