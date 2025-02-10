import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './index.css'
import App from './App.jsx'
// import Product from './pages/Product.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Navbar from './components/Navbar.jsx';
import Cart from './pages/Cart.jsx';
import Product from './components/Product.jsx';
import {Provider} from "react-redux";
import appStore from './utils/appStore.js';

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
        path: "/product",
        element: <Product />
      },
    ],
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <RouterProvider router={appRouter}/>
);