import React from "react";
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  // 2 ways to bind 'this' to the extended component.
  // In react, you can only reference 'this' within it's built in components, i.e. ComponentDidMount, render() etc.
  // If you want to reference 'this' within your own methods, or functions, you need to do either:
  // 1.
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  //   // and the same for every subsequent method you make
  //   }
  // }
  // //or instead of creating constructor, you make your own function a property that stores an arrow function, like:

  // Creates a reference object to the currenly selected component
  myInput = React.createRef();

  goToStore = event => {
    // 1. Stop form from submitting
    event.preventDefault();
    // 2. Get the text from that input - expl = you access the form data from the myInput reference by using 'current' 
    const storeName = this.myInput.current.value;
    // 3. Change the page to /store/whatever-they-entered

    this.props.history.push(`/store/${storeName}`);
  };
  // because 'goToStore' is now a property, it is bound to the instance.

  // Natural way of writing a method, but within React components, 'this' will be undefined.
  // goToStore(event) {
  //
  //   event.preventDefault();

  //   console.log(this.myInput);
  // }

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    return (
      // <-- If you don't put the parenthesis, ; is assumed (ASI) and will break
      <React.Fragment>
        {/*<-- Solution to not being able to return sibling elements}*/}
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a store</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store ➡ </button>
        </form>
      </React.Fragment>
    );
  }
}

export default StorePicker;
