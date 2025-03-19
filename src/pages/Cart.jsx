import Summary from "../components/Summary";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeItem(item));
  }

  return (
    <div className="flex pt-[15vh]">
      <div className="flex flex-col justify-start p-5 gap-5 w-3/4">
      <span className="font-bold">Items In Cart: {cartItems.length}</span>
        {cartItems.map((item) => (
          <div key={item.id} className="w-full max-h-fit flex items-center p-6 bg-white rounded-lg shadow-md flex-grow mr-5">
            <div className="flex gap-4 w-full">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="font-medium">Rs. {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              {/* <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button> */}
              <button 
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                {/* Trash icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <Summary total={total}/>
    </div>
  );
};

export default Cart;