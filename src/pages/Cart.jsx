import Summary from "../components/Summary";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/cartSlice";

const Cart = () => {
  const quantity = 1;

  const cartItems = useSelector((store) => store.cart.items);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const dispatch = useDispatch();
  console.log(cartItems);

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
                {/* <p className="text-gray-600 font-medium">{item.description}</p> */}
                <p className="font-medium">Rs. {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="cart-actions">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <img
                  src="src/assets/h.png"
                  alt="Add to wishlist"
                  className="w-6 h-6"
                />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => handleRemoveFromCart(item.id)}
            >
                <img
                  src="src/assets/trash.png"
                  alt="Remove from cart"
                  className="w-6 h-6"
                />
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
