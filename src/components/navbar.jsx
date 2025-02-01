import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-full h-[8vh] flex justify-between items-center fixed bg-white border-b p-4">
            <div className="font-bold text-2xl">
                <Link to="/">UniThrift</Link>
            </div>
            <div className='flex items-center gap-10 font-medium'>
                <Link to="/cart">Cart</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/login" className='bg-gray-600 hover:bg-gray-600/90 px-4 py-2 text-white rounded-md'>Login</Link>
            </div>
            
        </nav>
    );
};

export default Navbar;