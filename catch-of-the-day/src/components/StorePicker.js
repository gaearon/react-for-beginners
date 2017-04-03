import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	// every component you build needs at least one method and that's the render method
	goToStore(event) {
		// prevents page refresh
		event.preventDefault();
		console.log('You changed the URL');
		// first grab text from box
		const storeId = this.storeInput.value;
		console.log(`Going to ${storeId}`)
		// second transition from / to /store/storeId
		this.context.router.transitionTo(`/store/${storeId}`);
	}
	render() {
		// Anywhere else
		return (
			<form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
				<button type="submit">Visit Store →</button>
			</form>
		)
	}
}

// surface router. tell React that StorePicker component expects something called a router, and router says ok, I will make this router available to you.
StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;
