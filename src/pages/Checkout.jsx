import { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../utils/cartSlice';
import useCheckout from '../utils/useCheckout';
import UserContext from '../utils/UserContext';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const cartItems = useSelector(state => state.cart.items);
  const { currentUser } = useContext(UserContext);
  const { processCheckout } = useCheckout();
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Please enter a shipping address');
      return;
    }
    
    try {
      setProcessing(true);
      setError('');
      
      const results = await processCheckout(cartItems, address, currentUser);
      const allSuccessful = results.every(result => result.success);
      
      if (allSuccessful) {
        dispatch(clearCart());
        setSuccess(true);
        setAddress('');
        // Redirect to order confirmation or orders page
      } else {
        setError('There was an issue processing your order');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto py-10 mt-[8vh] ">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">Order placed successfully!</div>}
      {cartItems.map((item) => (
          <div key={item.id} className="w-full max-h-fit flex items-center rounded-xl p-2 bg-white flex-grow mr-5">
            <div className="flex gap-4 w-full">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                {/* <p className="text-gray-600 font-medium">{item.description}</p> */}
                <p className="font-medium">Rs. {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label className="block text-sm font-medium mb-1">Shipping Address</label>
          <textarea 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="3"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 ${processing ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          disabled={processing || !cartItems.length}
        >
          {processing ? 'Processing...' : `Place Order (₹${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)})`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;