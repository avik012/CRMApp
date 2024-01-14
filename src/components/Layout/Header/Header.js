import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Header = () => {
  const alert = useAlert();
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    history('/login')
    dispatch(logout());
    alert.success("Logout Successfully")
  }
  
  return (
    <nav style={{zIndex:32}} className="navbar navbar-expand-lg  navbar-dark bg-dark" >
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">CRM App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname ==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname ==="/dashboard" ? "active" : ""}`} aria-current="page" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname ==="/products" ? "active" : ""}`} to="/products">Products</Link>
        </li>
      
      </ul>
      {isAuthenticated ? <button onClick={handleLogout} className='btn btn-primary'>Logout</button> :
       <form className="d-flex" role="search">
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      </form> }
    </div>
  </div>
</nav>
  )
}

export default Header
