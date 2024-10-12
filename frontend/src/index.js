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
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
const router =createBrowserRouter( 
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
          <Route index={true} path="/" element={<HomeScreen/>}/>
          <Route index={true} path="/product/:id" element={<ProductScreen/>}/>
          <Route index={true} path="/cart" element={<CartScreen/>}/>
       
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
     
  </React.StrictMode>
);
  
reportWebVitals();
