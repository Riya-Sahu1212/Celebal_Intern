import React, { useState } from 'react';
import "./styles.css";

export default function App() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    panNumber: '',
    aadharNumber: '',
    country: '',
    city: ''
  });

  const [validationMessages, setValidationMessages] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let message = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'username':
      case 'Country':
      case 'city':
        if (!value.trim()) {
          message = `${name.replace(/([A-Z])/g, ' $1')} is required`;
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          message = 'Email is invalid';
        }
        break;
      case 'password':
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}/.test(value)) {
          message = 'Password must contain at least 8 characters, one number, one capital letter, and one special character';
        }
        break;
      case 'phoneNumber':
        if (!/^\d{10}$/.test(value)) {
          message = 'Phone Number is invalid';
        }
        break;
      case 'panNumber':
        if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(value)) {
          message = 'PAN Number must be 10 characters long with 5 letters, 4 digits, and 1 letter';
        }
        break;
      case 'aadharNumber':
        if (!/^\d{12}$/.test(value)) {
          message = 'Aadhar Number must be 12 digits';
        }
        break;
      default:
        break;
    }
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: message
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newValidationMessages = {};
    for (const [key, value] of Object.entries(formValues)) {
      if (!value.trim()) {
        newValidationMessages[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
        isValid = false;
      }
    }
    setValidationMessages(newValidationMessages);
    if (isValid) {
      console.log('Form submitted successfully', formValues);
    }
  };

  const getCityOptions = () => {
    if (formValues.country === 'India') {
      return ['Kanpur', 'Lucknow', 'Mumbai', 'Gajiyabad', 'Kolkata'];
    } else if (formValues.country === 'United States') {
      return ['New York', 'California'];
    }
    return [];
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="App min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6" style={{border:"2px solid black"}}>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-center mb-8 text-blue-900">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
            {['firstName', 'lastName', 'username', 'email', 'panNumber', 'phoneNumber', 'Country', 'aadharNumber', 'city'].map((field, index) => (
              <div key={index} className="sm:col-span-3">
                <label
                  htmlFor={field}
                  className="block text-sm font-bold text-black-700"
                >
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <div className="mt-2">
                  {field === 'Country' ? (
                    <select
                      id={field}
                      name={field}
                      value={formValues[field]}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select {field}</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                    </select>
                  ) : field === 'city' ? (
                    <select
                      id={field}
                      name={field}
                      value={formValues[field]}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select {field}</option>
                      {getCityOptions().map((city, idx) => (
                        <option key={idx} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      id={field}
                      value={formValues[field]}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  )}
                  {validationMessages[field] && (
                    <p className="mt-2 text-sm text-red-600">{validationMessages[field]}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  <img
                    src="https://www.svgrepo.com/show/103061/eye.svg"
                    alt="Toggle Password Visibility"
                    className="h-5 w-5 text-gray-500"
                    style={{width:"10px",height:"10px"}}
                  />
                </button>
                {validationMessages.password && (
                  <p className="mt-2 text-sm text-orange-600">{validationMessages.password}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-6 flex justify-center mt-6">
              <button
                type="submit" 
                style={{margin:"4px",backgroundColor:"green",color:"white",height:"50px"}}
                className="bg-green-300 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
