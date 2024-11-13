import PropTypes from "prop-types";

const Printer = ({ orderDetails, total }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold text-gray-700">Receipt</h1>
      {orderDetails.map((detail, index) => (
        <p key={index}>
          Product Name: {detail.name} ({detail.quantity} kg), Quantity:{" "}
          {detail.quantity}
        </p>
      ))}
      <h2 className="text-xl font-bold text-center">Total: ${total}</h2>
    </div>
  );
};

Printer.propTypes = {
  orderDetails: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
};

export default Printer;
