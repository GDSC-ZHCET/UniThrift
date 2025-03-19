import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../utils/cartSlice";
import { CheckIcon, XIcon } from '@heroicons/react/solid';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white">
      <main>
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-12 w-12 mx-auto text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart</p>
                  <div className="mt-6">
                    <Link 
                      to="/" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                          />
                        </div>

                        <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                          <div>
                            <div className="flex justify-between sm:grid sm:grid-cols-2">
                              <div className="pr-6">
                                <h3 className="text-sm">
                                  <span className="font-medium text-gray-700 hover:text-gray-800">
                                    {item.title}
                                  </span>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                              </div>

                              <p className="text-sm font-medium text-gray-900 text-right">₹{item.price}</p>
                            </div>

                            <div className="mt-4 flex items-center sm:block sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 ">
                              <label htmlFor={`quantity-${item.id}`} className="mr-0 text-sm font-medium text-gray-700 ">
                                Quantity: {item.quantity}
                              </label>
                            </div>
                          </div>

                          <div className="mt-4 flex space-x-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
                            >
                              <XIcon className="h-4 w-4 mr-1" />
                              <span>Remove</span>
                            </button>
                            <span className="text-gray-300">|</span>
                            
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Order summary */}
                  <section aria-labelledby="summary-heading" className="mt-10">
                    <h2 id="summary-heading" className="sr-only">
                      Order summary
                    </h2>

                    <div>
                      <dl className="space-y-4">
                        <div className="flex items-center justify-between">
                          <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                          <dd className="ml-4 text-base font-medium text-gray-900">₹{subtotal}</dd>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <dt className="text-lg font-bold text-gray-900">Total</dt>
                          <dd className="ml-4 text-lg font-bold text-gray-900">₹{subtotal}</dd>
                        </div>
                      </dl>
                      <p className="mt-1 text-sm text-gray-500">Shipping and delivery options will be calculated at checkout.</p>
                    </div>

                    <div className="mt-10">
                      <button
                        type="button"
                        onClick={handleCheckout}
                        className="w-full bg-[#111828] hover:bg-[#1f2937] text-white py-3 px-5 rounded-md cursor-pointer transition duration-200 flex items-center justify-center gap-2"
                      >
                        Checkout
                      </button>
                    </div>

                    <div className="mt-6 text-sm text-center text-gray-500">
                      <p>
                        or{' '}
                        <Link to="/" className="text-green-600 font-medium hover:text-green-500">
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </Link>
                      </p>
                    </div>
                  </section>
                </>
              )}
            </section>
          </form>
        </div>

        {/* Policy grid */}
        <section aria-labelledby="policies-heading" className="bg-gray-50 border-t border-gray-200">
          <h2 id="policies-heading" className="sr-only">
            Our policies
          </h2>

          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
              {[
                {
                  name: 'Free campus pickup',
                  description: 'Choose campus pickup option at checkout for same-day delivery by fellow students.',
                  icon: (
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  ),
                },
                {
                  name: 'Sustainable exchange',
                  description: 'Support sustainability by buying and selling second-hand items within our university community.',
                  icon: (
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
                {
                  name: 'Student support',
                  description: 'Have questions? Our student team is here to help with any issues related to your purchases.',
                  icon: (
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  ),
                },
              ].map((policy) => (
                <div
                  key={policy.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="md:flex-shrink-0 flex justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
                      {policy.icon}
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-900">{policy.name}</h3>
                    <p className="mt-3 text-sm text-gray-500">{policy.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cart;