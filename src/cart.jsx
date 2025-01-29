const Cart = () => {
    const quantity=1
    return ( 
            <div className="cart-container">
                <div className="cart-items">
                    <img src="src/assets/shoes.png" />
                    <div className="cart-details">
                        <h3>Nike Air Force 1 '07 Fresh</h3>
                        <p>Men's Shoes</p>
                        <p>UK6</p>
                        <p>Quantity: {quantity}</p>
                    </div>
                </div>
                <div className="cart-actions">
                        <img src="src/assets/h.png" />
                        <img src="src/assets/trash.png"  />
                </div>
            </div>
     );
}
 
export default Cart;