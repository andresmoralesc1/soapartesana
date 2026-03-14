'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckoutProgress, getDefaultCheckoutSteps } from '@/components/CheckoutProgress';
import { useCart } from '@/components/CartContext';
import { ShoppingBag, User, Truck, CreditCard, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { getPriceNumber } from '@/lib/products';

interface FormData {
  // Step 1: Information
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  // Step 2: Shipping
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  saveInfo: boolean;
  // Step 3: Review
  paymentMethod: 'card' | 'whatsapp';
  notes: string;
}

const STEPS = [
  { id: 'cart', label: 'Carrito', icon: ShoppingBag },
  { id: 'info', label: 'Información', icon: User },
  { id: 'shipping', label: 'Envío', icon: Truck },
  { id: 'payment', label: 'Pago', icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveInfo: false,
    paymentMethod: 'card',
    notes: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalItems = items.length;
  const totalPrice = getTotalPrice();

  // Redirect if cart is empty
  useEffect(() => {
    if (totalItems === 0) {
      router.push('/productos');
    }
  }, [totalItems, router]);

  const updateCheckoutSteps = () => {
    const steps = getDefaultCheckoutSteps();
    steps.forEach((step, index) => {
      if (index < currentStep) {
        step.status = 'completed';
      } else if (index === currentStep) {
        step.status = 'current';
      } else {
        step.status = 'pending';
      }
    });
    return steps;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      router.push('/exito');
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
    }
  };

  const updatedSteps = updateCheckoutSteps();

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Progress */}
        <div className="mb-12">
          <CheckoutProgress steps={updatedSteps} />
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Information */}
            {currentStep === 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">Información de Contacto</h2>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nombre *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellido *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Tu apellido"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked) => setFormData({ ...formData, saveInfo: checked as boolean })}
                      />
                      <Label htmlFor="saveInfo" className="text-sm cursor-pointer">
                        Guardar mi información para la próxima compra
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 1 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">Dirección de Envío</h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="address">Dirección *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Calle y número"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Miami"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="Florida"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="zipCode">Código Postal *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        placeholder="33101"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">País *</Label>
                      <select
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                        required
                      >
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="CO">Colombia</option>
                        <option value="ES">España</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review */}
            {currentStep === 2 && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Order Summary */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Resumen del Pedido</h3>

                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-sm text-gray-500">Cant: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-terracotta">
                            ${(getPriceNumber(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-terracotta">${getPriceNumber(totalPrice).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Datos de Envío</h3>

                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nombre:</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="font-medium">Email:</span> {formData.email}</p>
                      <p><span className="font-medium">Teléfono:</span> {formData.phone}</p>
                      <p><span className="font-medium">Dirección:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 3 && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Order Summary */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Resumen Final</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${getPriceNumber(totalPrice).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Envío</span>
                        <span className="text-green-600">Gratis</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-3">
                        <span>Total</span>
                        <span className="text-terracotta">${getPriceNumber(totalPrice).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-3">
                      <Label>Método de Pago</Label>
                      <div className="space-y-2">
                        <button
                          onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                          className={`w-full p-4 border rounded-lg text-left flex items-center gap-3 transition-colors ${
                            formData.paymentMethod === 'card'
                              ? 'border-terracotta bg-terracotta/5'
                              : 'border-gray-200 hover:border-terracotta'
                          }`}
                        >
                          <CreditCard className="h-5 w-5 text-terracotta" />
                          <div className="flex-1">
                            <p className="font-medium">Tarjeta de Crédito</p>
                            <p className="text-xs text-gray-500">Procesado seguro por Stripe</p>
                          </div>
                          {formData.paymentMethod === 'card' && (
                            <CheckCircle className="h-5 w-5 text-terracotta" />
                          )}
                        </button>

                        <button
                          onClick={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                          className={`w-full p-4 border rounded-lg text-left flex items-center gap-3 transition-colors ${
                            formData.paymentMethod === 'whatsapp'
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-500'
                          }`}
                        >
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.976-1.561-20.676-15.462-12.965z"/>
                          </svg>
                          <div className="flex-1">
                            <p className="font-medium">WhatsApp</p>
                            <p className="text-xs text-gray-500">Confirmación personal</p>
                          </div>
                          {formData.paymentMethod === 'whatsapp' && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <Label htmlFor="notes">Notas del Pedido (opcional)</Label>
                      <textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="¿Algún detalle especial sobre tu pedido?"
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Final Review */}
                <Card className="bg-gradient-to-br from-terracotta/10 to-amber-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Revisa tu Pedido</h3>

                    <div className="space-y-3 text-sm mb-6">
                      <p><strong>Productos:</strong> {totalItems} artículo{totalItems > 1 ? 's' : ''}</p>
                      <p><strong>Total:</strong> ${getPriceNumber(totalPrice).toFixed(2)}</p>
                      <p><strong>Envío a:</strong> {formData.city}, {formData.state}</p>
                      <p><strong>Pago:</strong> {formData.paymentMethod === 'card' ? 'Tarjeta' : 'WhatsApp'}</p>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="w-full bg-terracotta text-white hover:bg-terracotta/90 py-4 text-lg font-semibold"
                    >
                      {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
                    </Button>

                    <p className="text-xs text-center text-gray-500 mt-3">
                      Al confirmar, aceptas nuestros términos y condiciones
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Atrás
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              className="gap-2 bg-terracotta text-white hover:bg-terracotta/90"
            >
              Continuar
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
