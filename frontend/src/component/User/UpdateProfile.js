import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoneNumber(user.phoneNumber || "");
      setDateOfBirth(user.dateOfBirth || "");
      setAddress(user.address || "");
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("phoneNumber", phoneNumber);
    myForm.set("dateOfBirth", dateOfBirth);
    myForm.set("address", address);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Date of Birth"
                    required
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={user.email}
                    readOnly
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
