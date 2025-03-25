import React, { useState } from "react";
import { signup } from "../../../frontend/src/api"; // Import the signup function
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Link } from "react-router-dom"; // Import Link component
import "./Signup.css";

import honeyImage from '../Components/assets/image1.png';
import fishImage1 from '../Components/assets/hero_image.png';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleKeyPress = (e) => {
    // Allow only letters and spaces in the name field
    if (e.target.name === "name" && !/^[a-zA-Z\s]*$/.test(e.key)) {
      e.preventDefault();
    }

    // Allow only digits in the contactNo field
    if (e.target.name === "contactNo" && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }

    // Allow only letters, digits, and spaces in the address field
    if (e.target.name === "address" && !/^[a-zA-Z0-9\s]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email must be a valid email address.";
        }
        break;
      case "contactNo":
        if (!/^\d{10}$/.test(value)) {
          error =
            "Phone number must be exactly 10 digits and contain no letters.";
        }
        break;
      case "password":
        if (value.length < 6) {
          error = "Password must be at least 6 characters long.";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for any errors before submitting
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      const response = await signup(formData); // Call the signup function
      console.log(response.data);

      if (response.data.success) {
        // Redirect to OTP page with email as a query parameter (optional)
        navigate("/verifyotp", { state: { email: formData.email } });
      } else {
        // If the response indicates a failure, show an alert
        alert(response.data.message);
      }
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Welcome Section */}
        <div className="signup-text" style={{ textAlign: 'center' }}>
  <h2 style={{ margin: '190px 0 20px' }}>
    Join <span style={{ color: "#09bd18" }}>Sports Gear</span> today
  </h2>
  <p style={{ marginTop: '80px' }}>
    Discover a world of sports eqipments with prime quality.
  </p>
          <div className="image-container">
          <img src={honeyImage} alt="Honey Jar" style={{ width: '400px', height: 'auto' }} />

    <img src={fishImage1} alt="Dried Fish1" style={{ width: '400px', height: 'auto' }}/>
</div>

        </div>

        {/* Signup Form Section */}
        <div className="signup-form-container">
          <h1>Welcome</h1>
          <p>Getting started is easy</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              className="signup-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Full Name"
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <input
              className="signup-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <input
              className="signup-input"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Address"
              required
            />

            <input
              className="signup-input"
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Contact Number"
              required
            />
            {errors.contactNo && (
              <p className="error-message">{errors.contactNo}</p>
            )}

            <input
              className="signup-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}

            <input
              className="signup-input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}

            <button className="signup-button" type="submit">
              Create Account
            </button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
