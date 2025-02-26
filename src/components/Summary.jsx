const Summary = ({total}) => {

    const subtotal=80
    const delivery=40
    const totalLocal = total + delivery

    return ( 
        <div className="w-2/4 h-fit bg-white p-5 pb-10 mr-4 rounded-lg shadow-md">
            <div className="pb-10">
                <h2 className="font-bold text-2xl">Summary</h2>
            </div>
            <div className="subtotal">
                Subtotal
                <div className="p1">${total}</div>
            </div>
            <div className="ed">
                Estimated Delivery & Handling
                <div className="p2">${delivery}</div>
            </div>
            <div className="flex justify-between py-10 text-xl font-bold">
                Total
                <div className="p3">${totalLocal}</div>
            </div>
            
            <button className="checkout-btn">
                Checkout
            </button>
        </div>
        
     );
}
 
export default Summary;
<div className="summary">
    <h2>Summary</h2>
</div>