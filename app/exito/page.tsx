'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      router.push('/');
    }
    setLoading(false);
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-10 w-10 text-green-600" />
        </motion.div>

        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          ¡Pago Exitoso!
        </h1>
        <p className="text-gray-600 mb-6">
          Tu pedido ha sido confirmado. Recibirás un email con los detalles.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 text-left">
            <Package className="h-5 w-5 text-terracotta" />
            <div>
              <p className="font-medium text-sm">Estado del pedido</p>
              <p className="text-xs text-gray-500">Procesando tu pedido...</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-terracotta/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Volver a la Tienda
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Gracias por apoyar lo artesanal 🌿
        </p>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
