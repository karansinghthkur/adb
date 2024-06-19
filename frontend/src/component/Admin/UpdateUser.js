import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.role);
      setPhoneNumber(user.phoneNumber || "");
      setDateOfBirth(user.dateOfBirth || "");
      setAddress(user.address || "");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("role", role);
    formData.set("phoneNumber", phoneNumber);
    formData.set("dateOfBirth", dateOfBirth);
    formData.set("address", address);

    dispatch(updateUser(userId, formData));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="updateUserContainer">
          {loading ? (
            <Loader />
          ) : (
            <form className="updateUserForm" onSubmit={updateUserSubmitHandler}>
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              <div>
                <VerifiedUserIcon />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <VerifiedUserIcon />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div>
                <VerifiedUserIcon />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <Button
                id="updateUserBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
