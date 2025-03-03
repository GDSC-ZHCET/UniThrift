import Product from'./pages/Product.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Cart from './pages/Cart'
import FetchProductsList from './components/FetchProduct.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Header from "./pages/Header";


function App() {
  return (
    <div className='App'>
      <div className="content">
        
        <ProfilePage/>
      </div>
    </div>
  )
    <>
      <Header/>
      <h1 className="text-black">Head</h1>
    </>
  );
}

export default App;
