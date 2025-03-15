import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Products from './pages/Product.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Navbar from './components/Navbar.jsx';
import Cart from './pages/Cart.jsx';
import Product  from './components/Product.jsx';
import Upload from './pages/Upload.jsx';
import {Provider} from "react-redux";
import appStore from './utils/appStore.js';
import { UserProvider } from './utils/UserContext.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useContext } from 'react';
import UserContext from './utils/UserContext.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderStatus from './pages/OrderStatus.jsx';
import SellerConfirmation from './pages/SellerConfirmation.jsx';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  
  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};



const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup", 
    element: <Signup />
  },
  {
    path: "/",
    element: (
      <>
      <Provider store={appStore}>
        <Navbar />
        <Outlet />
      </Provider>
      </>
    ),
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "/product/:productId",
        element: <Product />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/status",
        element: (
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        )
      },
      {
        path: "/confirm",
        element: (
          <ProtectedRoute>
            <SellerConfirmation />
          </ProtectedRoute>
        )
      },
      {
        path: "/upload",
        element: (
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        )
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
    ],
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <UserProvider>
    <RouterProvider router={appRouter}/>
  </UserProvider>
);