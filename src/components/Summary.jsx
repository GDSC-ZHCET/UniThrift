import { Link } from "react-router-dom";

const Summary = ({total}) => {

    const delivery=0
    const totalLocal = total + delivery

    return ( 
        <div className="w-2/4 h-fit bg-white p-5 pb-10 mr-4 rounded-lg shadow-md">
            <div className="pb-10">
                <h2 className="font-bold text-2xl">Summary</h2>
            </div>
            <div className="subtotal">
                Subtotal
                <div className="p1">₹{total}</div>
            </div>
            <div className="ed">
                Estimated Delivery & Handling
                <div className="p2">₹{total === 0 ? 0 : delivery}</div>
            </div>
            <div className="flex justify-between py-10 text-xl font-bold">
                Total
                <div className="p3">₹{total === 0 ? 0 : totalLocal}</div>
            </div>
            
            <Link to={'/checkout'} className="checkout-btn">
                Checkout
            </Link>
        </div>
        
     );
}
 
export default Summary;