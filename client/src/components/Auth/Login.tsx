import React, { useState } from 'react';
import { useFormik } from 'formik';
import { login } from './api.js';
import { useAuth } from '../../middleware/AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
  const [error, setError] = useState('');
  const { login: loginContext } = useAuth(); // Get the login function from context
  const navigate = useNavigate(); // Initialize navigate

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: values => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email format';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    onSubmit: async values => {
      try {
        const data = await login(values.email, values.password);

        localStorage.setItem('user', JSON.stringify(data));

        loginContext(data);

        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        navigate('/'); // Redirect to the home page
      } catch (err) {
        setError(err.message || 'Login failed');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 ${
                formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && <div className="text-red-500 mt-2 text-sm">{formik.errors.email}</div>}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 ${
                formik.errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && <div className="text-red-500 mt-2 text-sm">{formik.errors.password}</div>}
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md font-medium hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
