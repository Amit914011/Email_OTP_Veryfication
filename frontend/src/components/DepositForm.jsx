import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CombinedForm = () => {
  const [transactionType, setTransactionType] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [email, setEmail] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  // Function to generate a 6-digit OTP
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 999999).toString();
    setGeneratedOTP(otp);
    return otp;
  };

  // Handle email submission and OTP generation
  const handleSendOTP = async () => {
    if (email) {
      const otp = generateOTP();

      try {
        await axios.post('http://localhost:5000/send-otp', { email, otp });
        setError('');
        alert('OTP has been sent to your email');
      } catch (err) {
        console.error('Error sending OTP:', err);
        setError('Failed to send OTP. Please try again later.');
      }
    } else {
      setError('Please enter a valid email address');
    }
  };

  const handleTransactionChange = (e) => {
    setTransactionType(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, transactionType: '' }));
    }
  };

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, depositAmount: '' }));
    }
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!transactionType) {
      validationErrors.transactionType = 'Please select a transaction type.';
    }
    if (!depositAmount || depositAmount <= 0) {
      validationErrors.depositAmount = 'Please enter a valid deposit amount.';
    }
    if (!email) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    return validationErrors;
  };

  const handleConfirm = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const data = {
        transactionType,
        depositAmount,
        currency: transactionType === 'INDIAN_CASE' ? 'INR' : 'USDT',
      };

      // Save data to localStorage
      localStorage.setItem('depositData', JSON.stringify(data));

      // Navigate to OTP verification
      handleSendOTP();
    }
  };

  const handleVerifyOTP = () => {
    if (enteredOTP === generatedOTP) {
      setIsVerified(true);
      alert('OTP Verified! Redirecting...');
      navigate('/welcome'); // Redirect to another page after verification
    } else {
      setErrors((prev) => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 font-poppins">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-300 ease-in-out">
        <h2 className="text-3xl font-bold mb-6 text-center">Deposit & OTP Verification</h2>

        {/* Transaction Type Dropdown */}
        <select
          className="w-full bg-gray-900 text-white p-3 border border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200 ease-in-out"
          value={transactionType}
          onChange={handleTransactionChange}
        >
          <option value="">Transaction Type</option>
          <option value="INDIAN_CASE">INDIAN CASH</option>
          <option value="USDT">USDT</option>
        </select>
        {errors.transactionType && <p className="text-red-500 text-sm mb-2">{errors.transactionType}</p>}

        {/* INDIAN CASE Form */}
        {transactionType === 'INDIAN_CASE' && (
          <div className="bg-gray-700 p-6 rounded-lg mb-4 animate_animated animate_fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-red-500 animate-pulse">Important Note*</h3>
            <p className="text-sm mb-2 text-red-300">Please make sure to deposit in Indian currency only.</p>
            <p className="text-sm mb-2 text-red-300">Transaction processing time is 24-48 hours.</p>
            <p className="text-sm mb-2 text-red-300">All deposits are non-refundable.</p>
            <p className="text-sm mb-4 text-red-300">Contact support if you face any issues.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Currency</label>
              <input
                type="text"
                value="INR"
                readOnly
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Deposit Amount</label>
              <input
                type="number"
                placeholder="Enter deposit amount"
                value={depositAmount}
                onChange={handleDepositChange}
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
              {errors.depositAmount && <p className="text-red-500 text-sm mt-1">{errors.depositAmount}</p>}
            </div>
          </div>
        )}

        {/* USDT CASE Form */}
        {transactionType === 'USDT' && (
          <div className="bg-gray-700 p-6 rounded-lg mb-4 animate_animated animate_fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-red-500 animate-pulse">Important Note*</h3>
            <p className="text-sm mb-2 text-red-300">Please make sure to deposit in USDT only.</p>
            <p className="text-sm mb-2 text-red-300">Transaction processing time is 12-24 hours.</p>
            <p className="text-sm mb-2 text-red-300">USDT deposits are final and non-refundable.</p>
            <p className="text-sm mb-4 text-red-300">For assistance, contact support.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Currency</label>
              <input
                type="text"
                value="USDT"
                readOnly
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Deposit Amount</label>
              <input
                type="number"
                placeholder="Enter deposit amount"
                value={depositAmount}
                onChange={handleDepositChange}
                className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
              {errors.depositAmount && <p className="text-red-500 text-sm mt-1">{errors.depositAmount}</p>}
            </div>
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
        </div>

        {/* Send OTP Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          onClick={handleConfirm}
        >
          Send OTP
        </button>

        {/* OTP Input and Verification */}
        {generatedOTP && (
          <div className="mt-6">
            <input
              type="text"
              className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter OTP"
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
            />
            <button
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
            {errors.otp && <p className="text-red-500 text-sm mt-2">{errors.otp}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedForm;
