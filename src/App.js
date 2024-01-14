import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/User/Home.js';
import LoginSignUp from './components/User/LoginSignUp';
import Profile from './components/User/Profile';
import { clearErrors, loadUser } from './actions/userAction';
import store from './store'
import { useEffect } from 'react';
import ProtectedRoute from './components/Route/ProtectedRoute.js'
import { useSelector } from 'react-redux';
import Products from './components/Product/Products.js';
import ProductDetails from './components/Product/ProductDetails.js';
import UpdateProduct from './components/Product/UpdateProduct.js';
import NewProduct from './components/Product/NewProduct.js';
import Header from './components/Layout/Header/Header.js';
import Dashboard from './components/dashboard/Dashboard.js';

function App() {

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(clearErrors());
  }, []);

  return (
    <>
    <Router>
      <Header />
      <Routes>
      <Route exact path='/' Component={Home}  />
      <Route exact path='/login' Component={LoginSignUp}  />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/account" element= {<Profile />} />
      </Route>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/products" element= {<Products />} />
      </Route>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/products/:id" element= {<ProductDetails />} />
      </Route>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/product/update/:id" element= {<UpdateProduct />} />
      </Route>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/product/create" element= {<NewProduct />} />
      </Route>

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/dashboard" element= {<Dashboard />} />
        </Route>


      </Routes>
    </Router>
    
    </>
  );
}

export default App;
