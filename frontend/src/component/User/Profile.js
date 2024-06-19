import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.firstName}'s Profile`} />
          <div className="profileContainer">
            <div className="profileDetails">
              <h1>My Profile</h1>
              <img src={user.avatar?.url} alt={user.firstName} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div className="profileInfo">
              <div>
                <h4>Full Name</h4>
                <p>{`${user.firstName} ${user.lastName}`}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Phone Number</h4>
                <p>{user.phoneNumber}</p>
              </div>
              <div>
                <h4>Date of Birth</h4>
                <p>{user.dateOfBirth}</p>
              </div>
              <div>
                <h4>Address</h4>
                {user.address ? (
                  <p>{`${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}, ${user.address.country}`}</p>
                ) : (
                  <p>No address provided</p>
                )}
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div className="profileLinks">
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
