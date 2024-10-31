import React from 'react';
import ReactDOM from 'react-dom/client';  
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteProvider,
  RouterProvider
} from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/shippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './components/AdminRoute';
import OrderListScreen from './screens/Admins/OrderListScreen';
import ProductListScreen from './screens/Admins/ProductListScreen';
import ProductEditScreen from './screens/Admins/ProductEditScreen';
import UserListScreen from './screens/Admins/UserListScreen';
import UserEditScreen from './screens/Admins/UserEditScreen';
const router =createBrowserRouter( 
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
          <Route index={true} path="/" element={<HomeScreen/>}/>
          <Route  path="/product/:id" element={<ProductScreen/>}/>
          <Route  path="/cart" element={<CartScreen/>}/>
          <Route  path="/login" element={<LoginScreen/>}/>
          <Route  path="/register" element={<RegisterScreen/>}/>
         

          <Route path="" element={<PrivateRoute/>}>
              <Route  path="/shipping" element={<ShippingScreen/>}/>
              <Route  path="/payment" element={<PaymentScreen/>}/>
              <Route  path="/placeorder" element={<PlaceOrderScreen/>}/>
              <Route  path="/order/:id" element={<OrderScreen/>}/>
              <Route  path="/profile" element={<ProfileScreen/>}/>
          </Route>

          <Route path="" element={<AdminRoute/>}>
              <Route  path="/admin/orderlist" element={<OrderListScreen/>}/>
              <Route  path="/admin/productlist" element={<ProductListScreen/>}/>
              <Route  path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
              <Route  path="/admin/userlist" element={<UserListScreen/>}/>
              <Route  path="/admin/user/:id/edit" element={<UserEditScreen/>}/>

          </Route>
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // store is redux provider
  <React.StrictMode>
    
    <Provider store={store}>
       
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router}/>
        </PayPalScriptProvider>
    </Provider>
     
  </React.StrictMode>
);
  
reportWebVitals();
