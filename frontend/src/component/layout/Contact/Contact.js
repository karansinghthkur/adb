import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:karansinghthkur@gmail.com">
        <Button>Contact: karansinghthkur@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
