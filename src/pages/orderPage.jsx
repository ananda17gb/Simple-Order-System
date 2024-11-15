import { useState } from "react";
import OrderDetail from "./orderDetails";
import { getProductPrice, products } from "./product";
import Printer from "./printer";

function OrderPage() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [doneOrdering, setDoneOrdering] = useState(false);

  const addOrderDetails = (productId, quantity) => {
    if (doneOrdering) {
      alert("Order is complete. You cannot add more items.");
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (product) {
      setOrderDetails((prevDetails) => {
        const existingProduct = prevDetails.find(
          (detail) => detail.productId === productId
        );

        const productPrice = getProductPrice(productId);
        const productSubtotal = productPrice * quantity;

        if (existingProduct) {
          return prevDetails.map((detail) =>
            detail.productId === productId
              ? {
                  ...detail,
                  quantity: detail.quantity + quantity,
                  subtotal: (detail.quantity + quantity) * productPrice,
                }
              : detail
          );
        } else {
          return [
            ...prevDetails,
            {
              productId,
              name: product.name,
              quantity,
              price: productPrice,
              subtotal: productSubtotal,
            },
          ];
        }
      });
    }
  };

  const updateTotal = (productId, subtotal) => {
    setTotal(() => {
      const otherSubtotals = orderDetails
        .filter((detail) => detail.productId !== productId)
        .reduce(
          (sum, detail) =>
            sum + detail.quantity * getProductPrice(detail.productId),
          0
        );
      return otherSubtotals + subtotal;
    });
  };

  const handlePrintReceipt = () => {
    setShowReceipt(true);
    setDoneOrdering(true);
  };

  const clearReceipt = () => {
    setOrderDetails([]);
    setTotal(0);
    setShowReceipt(false);
    setDoneOrdering(false);
  };

  return (
    <div className="flex flex-col items-center my-10 lg:mx-20 h-full bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Cashier System
      </h1>
      <div className="flex justify-between lg:flex-row gap-8 w-full">
        <div className="flex flex-col w-full lg:w-[800px] bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Select Products:
          </h2>
          <div className="mt-4 space-y-3">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => addOrderDetails(product.id, 1)}
                className="px-6 py-3 text-left bg-gray-600 text-white rounded-md hover:bg-gray-800 transition duration-200 w-full sm:w-auto mx-1"
              >
                Add {product.name}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mt-8">
            Order List:
          </h2>
          <div className="mt-4">
            {orderDetails.map((detail, index) => (
              <OrderDetail
                key={index}
                productId={detail.productId}
                name={detail.name}
                quantity={detail.quantity}
                onSubtotalChange={updateTotal}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[600px] flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <div className="flex gap-4 mb-4">
            <button
              onClick={handlePrintReceipt}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            >
              Print Receipt
            </button>
          </div>
          {showReceipt ? (
            <div className="w-full flex flex-col items-center">
              <Printer orderDetails={orderDetails} total={total} />
              <button
                onClick={clearReceipt}
                className="mt-4 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Clear Receipt
              </button>
            </div>
          ) : (
            <p className="text-gray-600">No receipt to print</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
