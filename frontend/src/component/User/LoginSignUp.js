import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  // Refs for tabs and switcher animation
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  // State for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for registration form with new fields
  
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    }
  });
  

  const { firstName, lastName, email, password, phoneNumber, dateOfBirth, address } = user;

  // Avatar state for registration form
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // Login form submission handler
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  // Registration form submission handler
  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("dateOfBirth", user.dateOfBirth);
  
    // Create a new address object
    const addressData = {
      street: user.address.street,
      city: user.address.city,
      state: user.address.state,
      postalCode: user.address.postalCode,
      country: user.address.country,
    };
  
    // Append the address object
    formData.append("address", JSON.stringify(addressData));
  
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };
  

  // Handle input change for registration form including avatar preview
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name.startsWith("address")) {
      const fieldName = e.target.name.split("[")[1].split("]")[0];
      setUser({
        ...user,
        address: {
          ...user.address,
          [fieldName]: e.target.value
        }
      });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  

  // Redirect user after login or registration
  const redirect = location.search ? location.search.split("=")[1] : "/books";

  // Effect to handle errors, authentication status, and redirection
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  // Function to switch between login and registration forms
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              {/* Login Form */}
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              {/* Registration Form */}
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="firstName"
                    value={firstName}
                    onChange={registerDataChange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lastName"
                    value={lastName}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                {/* New fields */}
                <div className="signUpDetails">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={registerDataChange}
                  />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    required
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpAddress">
    <input
      type="text"
      placeholder="Street"
      required
      name="street"
      value={user.address.street}
      onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })}
    />
  </div>
  <div className="signUpAddress">
    <input
      type="text"
      placeholder="City"
      required
      name="city"
      value={user.address.city}
      onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })}
    />
  </div>
  <div className="signUpAddress">
    <input
      type="text"
      placeholder="State"
      required
      name="state"
      value={user.address.state}
      onChange={(e) => setUser({ ...user, address: { ...user.address, state: e.target.value } })}
    />
  </div>
  <div className="signUpAddress">
    <input
      type="text"
      placeholder="Postal Code"
      required
      name="postalCode"
      value={user.address.postalCode}
      onChange={(e) => setUser({ ...user, address: { ...user.address, postalCode: e.target.value } })}
    />
  </div>
  <div className="signUpAddress">
    <input
      type="text"
      placeholder="Country"
      required
      name="country"
      value={user.address.country}
      onChange={(e) => setUser({ ...user, address: { ...user.address, country: e.target.value } })}
    />
  </div>
{/* Avatar selection */}
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
