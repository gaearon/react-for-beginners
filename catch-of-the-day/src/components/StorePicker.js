import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    // every component you build needs at least one method and that's the render method
	goToStore() {
		console.log('You changed the URL');
		// first grab text from box
		// second transition from / to /store/storeId
	}
	render() {
		return (
            <form className="store-selector" onSubmit={this.gotToStore}>
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
                <button type="submit">Visit Store →</button>
            </form>
		)
	}
}

export default StorePicker;
