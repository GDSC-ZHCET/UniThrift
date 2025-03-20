import { FaShoppingCart, FaUpload, FaHandshake, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">How UniThrift Works</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Step 1: Browse Products */}
        <div className="flex items-center space-x-4">
          <FaShoppingCart className="text-green-600 text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">1. Browse Products</h2>
            <p>Explore a wide range of pre-loved items from fellow students at great prices.</p>
          </div>
        </div>

        {/* Step 2: Upload Items */}
        <div className="flex items-center space-x-4">
          <FaUpload className="text-blue-600 text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">2. Upload Items</h2>
            <p>Have something to sell? Upload your product with details and set your price.</p>
          </div>
        </div>

        {/* Step 3: Secure Transaction */}
        <div className="flex items-center space-x-4">
          <FaHandshake className="text-orange-600 text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">3. Secure Transactions</h2>
            <p>We ensure safe and secure transactions for both buyers and sellers.</p>
          </div>
        </div>

        {/* Step 4: Receive Your Order */}
        <div className="flex items-center space-x-4">
          <FaBoxOpen className="text-purple-600 text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">4. Receive Your Order</h2>
            <p>Once the deal is done, pick up your item or get it delivered on campus.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center mt-8 space-x-4">
        <Link to="/" className="px-6 py-3 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-700">
          Back to Home
        </Link>
        <Link to="/signup" className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700">
          Start Buying & Selling Now
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
