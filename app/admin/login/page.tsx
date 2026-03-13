'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, PawPrint, AlertCircle, Mail } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!validateEmail(email)) {
      errors.email = 'Ingresa un email válido';
    }

    if (!password) {
      errors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save session
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Credenciales inválidas. Por favor intenta nuevamente.');
      }
    } catch (err) {
      setError('Error de conexión. Verifica tu red e intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-4"
          >
            <PawPrint className="h-8 w-8 text-terracotta" />
          </motion.div>
          <h1 className="text-2xl font-serif font-bold text-terracotta">
            Artes_Ana
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Panel de Administración
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-terracotta/20 outline-none transition-all ${
                  fieldErrors.email
                    ? 'border-red-500 focus:border-red-500 bg-red-50/50'
                    : 'focus:border-terracotta bg-white'
                }`}
                placeholder="admin@artesana.com"
                autoComplete="email"
                aria-invalid={fieldErrors.email ? 'true' : 'false'}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                fieldErrors.email ? 'text-red-500' : 'text-gray-400'
              }`} />
            </div>
            {fieldErrors.email && (
              <motion.p
                id="email-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {fieldErrors.email}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }}
                className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-terracotta/20 outline-none transition-all ${
                  fieldErrors.password
                    ? 'border-red-500 focus:border-red-500 bg-red-50/50'
                    : 'focus:border-terracotta bg-white'
                }`}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={fieldErrors.password ? 'true' : 'false'}
                aria-describedby={fieldErrors.password ? 'password-error' : undefined}
              />
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                fieldErrors.password ? 'text-red-500' : 'text-gray-400'
              }`} />
            </div>
            {fieldErrors.password && (
              <motion.p
                id="password-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {fieldErrors.password}
              </motion.p>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Lock className="h-4 w-4" />
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </motion.button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Acceso exclusivo para administradores
        </p>
      </motion.div>
    </div>
  );
}
