import PropTypes from "prop-types";

const Alert = ({ children, className = "" }) => (
  <div
    className={`p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 ${className}`}
  >
    {children}
  </div>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Alert;
