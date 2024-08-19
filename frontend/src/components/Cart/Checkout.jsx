import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const sessionState = useSelector((state) => state.session);
  const currentUser = sessionState.user;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setForm((prevForm) => ({
        ...prevForm,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleKeyPress = (e) => {
    const allowedKeys = "0123456789/";
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const validateCardNumber = (number) => {
    const regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number)) {                                                                                                                                                                                                                                     
      return false;
    }
    return luhnCheck(number);
  };

  const luhnCheck = (val) => {
    let sum = 0;
    for (let i = 0; i < val.length; i++) {
      let intVal = parseInt(val.substr(i, 1));
      if (i % 2 === 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal = 1 + (intVal % 10);
        }
      }
      sum += intVal;
    }
    return sum % 10 === 0;
  };

  const validateExpDate = (date) => {
    const regex = new RegExp("^(0[1-9]|1[0-2])\\/([0-9]{2})$");
    if (!regex.test(date)) {
      return false;
    }
    const [month, year] = date.split("/").map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    return true;
  };

  const validateZipCode = (zip) => {
    const regex = new RegExp("^[0-9]{5}$");
    return regex.test(zip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!validateCardNumber(form.cardNumber)) {
      formErrors.cardNumber = "Invalid card number";
    }

    if (!validateExpDate(form.expDate)) {
      formErrors.expDate = "Invalid expiration date";
    }

    if (!validateZipCode(form.zip)) {
      formErrors.zip = "Invalid ZIP code";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      // console.log("Form submitted:", form);
      navigate("/thank-you");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Billing Details</h3>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            required
          />
          {errors.zip && <p className="error">{errors.zip}</p>}
        </label>

        <h3>Payment Information</h3>
        <label>
          Name on Card:
          <input
            type="text"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
        </label>
        <label>
          Expiration Date (MM/YY):
          <input
            type="text"
            name="expDate"
            value={form.expDate}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          {errors.expDate && <p className="error">{errors.expDate}</p>}
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
        </label>

        <button type="submit" className="submit-button">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
