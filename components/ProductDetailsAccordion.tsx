'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Product } from '@/lib/products';
import { Sparkles, Leaf, Droplet, Heart, Flower2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductDetailsAccordionProps {
  product: Product;
}

const accordionItems = [
  {
    key: 'ingredients',
    icon: <Leaf className="h-5 w-5" />,
    label: 'Ingredientes',
    color: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    key: 'benefits',
    icon: <Sparkles className="h-5 w-5" />,
    label: 'Beneficios',
    color: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    key: 'usage',
    icon: <Droplet className="h-5 w-5" />,
    label: 'Modo de uso',
    color: 'text-sky-600',
    iconBg: 'bg-sky-50',
  },
  {
    key: 'skin-type',
    icon: <Heart className="h-5 w-5" />,
    label: 'Tipo de piel',
    color: 'text-rose-600',
    iconBg: 'bg-rose-50',
  },
  {
    key: 'handmade',
    icon: <Flower2 className="h-5 w-5" />,
    label: '¿Por qué artesanal?',
    color: 'text-orange-600',
    iconBg: 'bg-orange-50',
  },
];

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full space-y-2">
      {/* Ingredients */}
      {product.ingredients && product.ingredients.length > 0 && (
        <AccordionItem value="ingredients" className="border-gray-100 rounded-xl overflow-hidden">
          <AccordionTrigger className="hover:bg-gray-50 transition-colors px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-700 p-2.5 rounded-lg">
                <Leaf className="h-4 w-4" />
              </span>
              <span className="font-semibold text-gray-900">Ingredientes</span>
              <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {product.ingredients.length}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                  </motion.span>
                ))}
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900 mb-1">Transparencia total</p>
                    <p className="text-sm text-emerald-700">
                      Lo que lees es lo que hay. Sin ingredientes ocultos, sin químicos sintéticos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Benefits */}
      {product.benefits && product.benefits.length > 0 && (
        <AccordionItem value="benefits" className="border-gray-100 rounded-xl overflow-hidden">
          <AccordionTrigger className="hover:bg-gray-50 transition-colors px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-100 text-amber-700 p-2.5 rounded-lg">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-semibold text-gray-900">Beneficios</span>
              <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {product.benefits.length}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="pt-2 space-y-3">
              {product.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-3 bg-amber-50 rounded-xl border border-amber-100"
                >
                  <div className="bg-amber-100 p-1.5 rounded-full flex-shrink-0">
                    <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                      <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium pt-0.5">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Usage */}
      {product.usage && (
        <AccordionItem value="usage" className="border-gray-100 rounded-xl overflow-hidden">
          <AccordionTrigger className="hover:bg-gray-50 transition-colors px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="bg-sky-100 text-sky-700 p-2.5 rounded-lg">
                <Droplet className="h-4 w-4" />
              </span>
              <span className="font-semibold text-gray-900">Modo de uso</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="pt-2 space-y-4">
              <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                <p className="text-gray-700 leading-relaxed">{product.usage}</p>
              </div>
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-sky-100 p-2 rounded-lg flex-shrink-0">
                    <Droplet className="h-4 w-4 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sky-900 mb-1">Tip profesional</p>
                    <p className="text-sm text-sky-700">
                      Para mejores resultados, deja actuar la espuma 30-60 segundos antes de enjuagar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Skin Type */}
      {product.skinType && product.skinType.length > 0 && (
        <AccordionItem value="skin-type" className="border-gray-100 rounded-xl overflow-hidden">
          <AccordionTrigger className="hover:bg-gray-50 transition-colors px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="bg-rose-100 text-rose-700 p-2.5 rounded-lg">
                <Heart className="h-4 w-4" />
              </span>
              <span className="font-semibold text-gray-900">Tipo de piel</span>
              <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {product.skinType.length}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap gap-2">
                {product.skinType.map((skin, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-rose-50 text-rose-800 border border-rose-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-100 transition-colors cursor-default"
                  >
                    {skin}
                  </motion.span>
                ))}
              </div>
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 p-2 rounded-lg flex-shrink-0">
                    <Heart className="h-4 w-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-rose-900 mb-1">¿No sabes cuál elegir?</p>
                    <p className="text-sm text-rose-700">
                      Escríbenos por WhatsApp para una recomendación personalizada según tu tipo de piel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Why Handmade */}
      <AccordionItem value="handmade" className="border-gray-100 rounded-xl overflow-hidden">
        <AccordionTrigger className="hover:bg-gray-50 transition-colors px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="bg-orange-100 text-orange-700 p-2.5 rounded-lg">
              <Flower2 className="h-4 w-4" />
            </span>
            <span className="font-semibold text-gray-900">¿Por qué artesanal?</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="pt-2 space-y-4">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed text-center">
                Cada barra es elaborada a mano en pequeños lotes para garantizar
                la máxima calidad y potencia de los ingredientes activos.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                { icon: <Droplet className="h-5 w-5" />, title: 'Glicerina natural', desc: 'Humectante natural retenida en el proceso' },
                { icon: <Sparkles className="h-5 w-5" />, title: 'Sin conservantes', desc: 'Cero químicos industriales' },
                { icon: <Flower2 className="h-5 w-5" />, title: 'Aceites puros', desc: 'Esenciales de alta calidad' },
                { icon: <Heart className="h-5 w-5" />, title: 'Producción ética', desc: 'Sostenible y consciente' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-orange-50 rounded-xl border border-orange-100"
                >
                  <div className="bg-orange-100 p-2.5 rounded-lg flex-shrink-0">
                    <span className="text-orange-600">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-orange-900">{item.title}</p>
                    <p className="text-sm text-orange-700">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
