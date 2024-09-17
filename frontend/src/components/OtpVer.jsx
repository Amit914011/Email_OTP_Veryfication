import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirecting

function OtpVer() {
  const [email, setEmail] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Navigation hook

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

  // Handle OTP verification
  const handleVerifyOTP = () => {
    if (enteredOTP === generatedOTP) {
      setIsVerified(true);
      setError('');
      alert('OTP Verified! Redirecting...');
      navigate('/welcome'); // Redirect to another page after verification
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 font-poppins">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Email OTP Verification
        </h1>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Send OTP Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          onClick={handleSendOTP}
        >
          Send OTP
        </button>

        {generatedOTP && (
          <div className="mt-6">
            {/* OTP Input */}
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter OTP"
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
            />
            
            {/* Verify OTP Button */}
            <button
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          </div>
        )}

        {isVerified && (
          <h2 className="text-green-600 text-center mt-4">✅ Email Verified Successfully!</h2>
        )}

        {error && (
          <p className="text-red-600 text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}

export default OtpVer;
