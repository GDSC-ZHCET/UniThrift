import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { signout } from '../utils/useSignout';

const Navbar = () => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signout();
        navigate('/login');
    };

    return (
        <nav className="w-full h-[8vh] fixed top-0 left-0 flex justify-between items-center bg-white border-b p-4">
            <div className="font-bold text-2xl">
                <Link to="/">UniThrift</Link>
            </div>
            <div className='flex items-center gap-10 font-medium'>
                <Link to="/cart">Cart</Link>
                <Link to="/wishlist">Wishlist</Link>
                {currentUser ? (
                    <div className='flex items-center gap-4'>
                        <p className='text-gray-600'>{currentUser.email}</p>
                        <button 
                            onClick={handleSignOut}
                            className='bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded-md'
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link 
                        to="/login" 
                        className='bg-gray-600 hover:bg-gray-600/90 px-4 py-2 text-white rounded-md'
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;