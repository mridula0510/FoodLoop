import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ✅ Guest login check
    if (formData.username === 'guest' && formData.password === '1234') {
      localStorage.setItem('guestLogin', 'true');
      onLogin({ username: 'guest' });
      navigate('/outlets');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/users/login/', formData);
      localStorage.setItem('token', res.data.token);
      onLogin({ username: formData.username });
      navigate('/outlets');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="backdrop-blur-md bg-white/10 dark:bg-gray-900/50 shadow-2xl border border-white/10 dark:border-gray-700 rounded-2xl px-10 py-12 w-full max-w-md text-white animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center mb-8">Welcome Back</h2>
        {error && (
          <p className="text-red-300 bg-red-900/30 p-2 rounded text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <input
            type="text"
            name="username"
            autoComplete="off"
            placeholder="Enter Email Address"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-white/20 text-white placeholder-gray-300 px-4 py-2 rounded-md border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/20 text-white placeholder-gray-300 px-4 py-2 rounded-md border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Don’t have an account?{' '}
          <a href="/signup" className="text-purple-300 hover:underline">
            Sign up here
          </a>
        </p>

        <div className="mt-4 text-center text-xs text-white/50 italic">
          <p className="mb-1">Want to explore without an account?</p>
          <p>
            Use <strong>guest</strong> / <strong>1234</strong> to login temporarily.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
