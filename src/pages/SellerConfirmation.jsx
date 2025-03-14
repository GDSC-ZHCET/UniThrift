import { useState } from "react";

function SellerConfirmation() {
  const [orderStatus, setOrderStatus] = useState("Pending");

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-md w-full p-6 shadow-lg bg-white rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Order Confirmation</h2>

        <div className="mb-4">
          <p className="text-gray-700 text-base">
            Order ID: <span className="font-semibold">#12345</span>
          </p>
          <p className="text-gray-700 text-base">
            Customer: <span className="font-semibold">Johnny Depp</span>
          </p>
        </div>

        <ul className="my-4 space-y-4">
          {[
            { name: "Amber Heard", quantity: 2, price: 20, img: "../src/assets/pp.jpg" },
            { name: "Sike Wind Force Two", quantity: 1, price: 15, img: "../src/assets/shoes.png" },
          ].map((item, index) => (
            <li key={index} className="flex items-center justify-between text-gray-800 border-b pb-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg"
              />
              <div className="text-sm text-right ml-auto">
                <span className="font-semibold block">{item.name}</span>
                <span className="block text-gray-500">Qty: {item.quantity}</span>
                <span className="font-semibold block text-green-600">
                  Price: ₹{item.price}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="font-bold text-lg mt-4">
          Total: <span className="text-green-600">₹{20 * 2 + 15}</span>
        </p>

        {/* Dynamic Order Status */}
        <p
          className={`mt-2 font-semibold text-base ${
            orderStatus === "Order Confirmed" ? "text-green-600" :
            orderStatus === "Order Canceled" ? "text-red-600" : "text-yellow-500"
          }`}
        >
          {orderStatus}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setOrderStatus("Order Confirmed")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md text-base transition duration-300"
          >
            Confirm
          </button>
          <button
            onClick={() => setOrderStatus("Order Canceled")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md text-base transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerConfirmation;
