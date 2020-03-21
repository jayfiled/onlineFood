import React from "react";
import PropTypes from 'prop-types';
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };


  componentDidMount() {
    // Grab the name of the store from the Router props supplied by React router
    const { params } = this.props.match;

    // if you update local storage with componentWillUpdate, you'll need to reinstate local storage

    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // Keep in mind that our state will effectively be in Firebase now, so it will be downloaded.  So if you are storing orders in local storage
    // and you are bringing it back on page refreshes etc, then you need to wait for our state to come down from firebase, otherwise the
    // props you used in Orders will be undefined when they are rendered.
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      // 👆 suppply the URL to the where the state is, then specify which part of state, 'fishes' in our case.  There are other things in here.
      context: this, // <-- Then supply the options as an object
      state: "fishes"
    });
  }

  componentDidUpdate() {
    // If the page refreshes, it go through lifecycle methods again, which will trigger this and state will be wiped, and this will update the
    // state to an empty object, so in componentDidMount, reinstate the state from local storage.
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order) // <-- Local storage needs to save key:values as strings, not the JS object, so you have to stringify
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state (to avoid mutating the original object)
    const fishes = { ...this.state.fishes };
    // 2. Add our new fishes to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state

    // setState only updates the state that's been changed
    this.setState({
      fishes // Same as saying 'fishes: fishes' can also write like this: this.setState({ fishes })
    });
    console.log("Adding a fish");
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the fish
    const fishes = { ...this.state.fishes };

    // 2. Update the copy
    fishes[key] = updatedFish;

    // 3. Set to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };

    fishes[key] = null; // <-- You could do 'delete fish[key]', but firebase won't update, so this is the way to do it if you use firebase.

    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // Take a copy of state
    const order = { ...this.state.order };
    // Either add to order or update the number

    order[key] = order[key] + 1 || 1;
    // Call setState to update our state
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key]; // <-- we are saving our order to local storage, not firebase, so we can use this syntax.
    this.setState({ order });
  };

  static propTypes = {
    match: PropTypes.object
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key} // <--- If you want to use the attributes of the HTML element, you can't use the 'key' as it's reserved for React, make your own instead.
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        {/* <Order {...this.state} /> Not best practice, but if you want to pass in the whole state, do this  */}
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}


export default App;
