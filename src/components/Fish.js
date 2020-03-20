import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  handleClick = () => {
    
  };

  static propTypes = {
      details: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        price: PropTypes.number,
        desc: PropTypes.string,
        status: PropTypes.string
      }),
      addToOrder: PropTypes.func
      } 

  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={this.props.details.image} alt={this.props.details.name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
          {isAvailable ? "Add To Cart" : "Sold Out"}
        </button>
      </li>
    );
  }
}

export default Fish;
