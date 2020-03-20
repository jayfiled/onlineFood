import React from "react";
import PropTypes from 'prop-types';
import { string } from "prop-types";

// Stateless functional component
// ES6 Syntax, returning only 1 line (because we use the parenthesis to make it think it is one line), so return is implicitly defined
//Its a function now (as opposed to a class), so you can remove the reference to 'this'

// Furthermore, you can detructure the props object argument to only the variables you want to use in your component
const Header = ({ tagline }) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      day
    </h1>
    <h3 className="tagline">
      <span>{tagline}</span>
    </h3>
  </header>
);

// Smart function - use this syntax if you want to use methods, state etc.

// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of">of</span>
//             <span className="the">the</span>
//           </span>
//           day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     );
//   }
// }

const propTypes = {
  tagline: PropTypes.string
}

export default Header;
