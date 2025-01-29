const Navbar = () => {
    return ( 
        <nav className="Navbar">
            <div className="logo">
                Logo
            </div>
            <div className="links">
                <a href="/stationery">Stationery</a>
                <a href="/electronics">Electronics</a>
                <a href="/computer-laptops">Computers & Laptops</a>
                <a href="/decor">Decor</a>
            </div>
            <div className="rightside">
                <div className="searchbar">
                    <img src="src/assets/searcg.png"  />
                    <input type="text"
                     className="search" 
                     placeholder="Search"/>
                </div>
                <div className="Favs">
                   <a href="/favourites">
                        <img src="src/assets/h.png"  />
                   </a>
                </div>
                <div className="cart">
                    <a href="/cart">
                        <img src="src/assets/cart.png"  />
                    </a>
                </div>
                <div className="profile">
                    <a href="/profile">
                        <img src="src/assets/profile.png"  />
                    </a>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;