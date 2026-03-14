'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Product } from '@/lib/products';
import { Sparkles, Leaf, Droplet, Heart } from 'lucide-react';

interface ProductDetailsAccordionProps {
  product: Product;
}

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {/* Ingredients */}
      {product.ingredients && product.ingredients.length > 0 && (
        <AccordionItem value="ingredients" className="border-gray-200">
          <AccordionTrigger className="hover:text-forest text-gray-900">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-forest" />
              <span>Ingredientes</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p className="text-gray-600">
                {product.ingredients.join(', ')}
              </p>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Transparencia total:</strong> Lo que lees es lo que hay.
                  Sin ingredientes ocultos, sin químicos sintéticos.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Benefits */}
      {product.benefits && product.benefits.length > 0 && (
        <AccordionItem value="benefits" className="border-gray-200">
          <AccordionTrigger className="hover:text-forest text-gray-900">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>Beneficios</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-sage/20 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="h-4 w-4 text-forest" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                      <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Usage */}
      {product.usage && (
        <AccordionItem value="usage" className="border-gray-200">
          <AccordionTrigger className="hover:text-forest text-gray-900">
            <div className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              <span>Modo de uso</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p className="text-gray-600">{product.usage}</p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip profesional:</strong> Para mejores resultados,
                  deja actuar la espuma 30-60 segundos antes de enjuagar.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Skin Type */}
      {product.skinType && product.skinType.length > 0 && (
        <AccordionItem value="skin-type" className="border-gray-200">
          <AccordionTrigger className="hover:text-forest text-gray-900">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500" />
              <span>Tipo de piel</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {product.skinType.map((skin, idx) => (
                  <span
                    key={idx}
                    className="bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skin}
                  </span>
                ))}
              </div>
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-4">
                <p className="text-sm text-rose-800">
                  <strong>¿No sabes cuál elegir?</strong> Escríbenos por WhatsApp
                  para una recomendación personalizada según tu tipo de piel.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Why Handmade */}
      <AccordionItem value="handmade" className="border-gray-200">
        <AccordionTrigger className="hover:text-forest text-gray-900">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-terracotta" />
            <span>¿Por qué artesanal?</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 text-gray-600">
            <p>
              Cada barra es elaborada a mano en pequeños lotes para garantizar
              la máxima calidad y potencias de los ingredientes activos.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="h-4 w-4 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Glicerina natural retenida (humectante)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="h-4 w-4 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Sin conservantes industriales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="h-4 w-4 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Aceites esenciales puros</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="h-4 w-4 text-terracotta" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Producción ética y sostenible</span>
              </li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
