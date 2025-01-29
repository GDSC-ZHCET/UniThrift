const Summary = () => {
    const subtotal=80
    const delivery=40
    const total=subtotal+delivery
    return ( 
        <div className="summary">
            <div className="s">
                <h2>Summary</h2>
            </div>
            <div className="subtotal">
                Subtotal
                <div className="p1">${subtotal}</div>
            </div>
            <div className="ed">
                Estimated Delivery & Handling
                <div className="p2">${delivery}</div>
            </div>
            <div className="tot">
                Total
                <div className="p3">${total}</div>
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