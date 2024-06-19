import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dpo25fsfu/image/upload/v1631555947/books/img_oievzt
.jpg"
              alt="Founder"
            />
            <Typography>Book Hub</Typography>
            <span>
              This is a Book Hub Ecommerce, your go-to source for exploring and
              buying a wide array of books from the comfort of your home.Book
              Hub Ecommerce Website where you can purchase books
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <h4>Karan Singh Thakur - 700758703</h4>
            <h4>Akhilandeswari Vegi - 700758173</h4>
            <h4>Kishen Dadala - 700762472</h4>
            <h4>Rahul Boyina - 700762095</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
