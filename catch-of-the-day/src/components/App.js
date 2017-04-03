import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();
		this.addFish = this.addFish.bind(this);
		this.removeFromOrder.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		// initial state (getInitialState if you are using reactCreateClass as we are here)
		this.state = {
			fishes: {},
			order: {}
		};

	}

	componentWillMount() {
		// this runs right before <App /> is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
		// check if there is any order in local storage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if(localStorageRef) {
			// update our App Component's order state
			this.setState({
				// changes string back to object
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnMount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	addFish(fish) {
		// update our state
		const fishes = {...this.state.fishes};
		// set state. Date.now() gives timestamp. New to JS.
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		// set state passing only the object that has changed here.
		this.setState({ fishes });
	}

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes });
	}

	removeFish(key) {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({ fishes });
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key) {
		// take a copy of our state
		const order = {...this.state.order};
		// update or add new number of fish ordered
		order[key] = order[key] + 1 || 1;
		// update our state (or ({ order: order }))
		this.setState({ order });

	}

	removeFromOrder(key) {
		const order = {...this.state.order};
		delete order[key];
		this.setState({ order });
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder} />
				<Inventory addFish={this.addFish} removeFish={this.removeFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish}
				storeId={this.props.params.storeId} />
			</div>
		)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;
