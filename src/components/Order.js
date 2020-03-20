import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  // instead of putting this complexity in the <ul> in the render function, abstract it out to it's own 'render' function like:

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    // You can put all these in the CSSTransition component but it's more dry if you just give it an object

    const transitionGroupOptions = {
      classNames: "order",
      key, // <-- key: key,
      timeout: { enter: 500, exit: 500 }
    }; // <-- Don't forget that if you need this is another file, put these options in their own file, and export it, and use named imports.

    // If fish don't exist in state (like while state is being downloaded from firebase) return nothing.
    if (!fish) return null;
    const isAvailable = fish.status === "available";

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionGroupOptions}>
          {/* <-- delay of when it adds itself to the dom (component mount/unmount), must match css transition duration */}
          <li key={key}>
            Sorry {fish ? fish.name : "Fish"} is no longer available'
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionGroupOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

static propTypes = {
  fishes: PropTypes.object,
  order: PropTypes.object,
  removeFromOrder: PropTypes.func
}

  render() {
    // order = this.props.order;
    // fishes = this.props.fishes;
    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {/* 👆 To animate elements, we replaced the element with a TransitionGroup component and specified which element we replaced} */}
          {/* // The same applies to any child elements you replace, you use the CSSTransition component tags */}

          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        {/* {order.keys().map(key => {
            <OrderItem name={key} amount={order[key]} price={fishes[key].price} /> */}

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
