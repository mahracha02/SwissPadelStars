import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue');
      }

      const data = await response.json();
      
      // Store token and user data
      login(data.token, data.user);
      
      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4 overflow-hidden">
      {/* 3D Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Padel Court */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-50 dark:bg-primary-900/20 rounded-lg rotate-45 scale-150 animate-pulse"></div>
        
        {/* Animated Padel Balls */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-primary-100 dark:bg-primary-800 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary-100 dark:bg-primary-800 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-primary-100 dark:bg-primary-800 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>

        {/* Floating Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-50 dark:bg-primary-900/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '0s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-50 dark:bg-primary-900/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-50 dark:bg-primary-900/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>

        {/* Padel Rackets */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-primary-100 dark:bg-primary-800/20 rounded-full transform rotate-45 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-primary-100 dark:bg-primary-800/20 rounded-full transform -rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl blur-xl opacity-30"></div>
        <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/20 transform hover:scale-[1.02] transition-transform duration-300">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-white/20 shadow-lg mb-4 transform hover:rotate-12 transition-transform duration-300">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Bienvenue</h2>
            <p className="text-white/80 mt-2">Connectez-vous à votre compte</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 shadow-sm focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 backdrop-blur-sm"
                placeholder="Entrez votre email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 shadow-sm focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 backdrop-blur-sm"
                placeholder="Entrez votre mot de passe"
              />
            </div>

            {error && (
              <div className="text-white text-sm text-center bg-red-500/30 p-3 rounded-lg animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 