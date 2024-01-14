import React, { useEffect } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";

const Profile = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  console.log("user", isAuthenticated, loading, user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        user && (
          <>
            <MetaData title={`${user?.firstName}'s Profile`} />
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={user.image} alt={user?.name} />
                <button onClick={logoutUser}>Logout</button>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{`${user?.firstName} ${user?.lastName}`}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <h4>Gender</h4>
                  <p>{user?.gender}</p>
                </div>

                <div></div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default Profile;
