'use client';

import { Check, X, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const comparisons = [
  {
    feature: 'Seguro si se lame',
    artesAna: { status: 'yes', text: '100% comestible' },
    competition: { status: 'no', text: 'Puede ser tóxico' },
  },
  {
    feature: 'pH balanceado para mascotas',
    artesAna: { status: 'yes', text: 'pH 7.0 neutro' },
    competition: { status: 'no', text: 'pH ácido (3.5-5)' },
  },
  {
    feature: 'Ingredientes tóxicos',
    artesAna: { status: 'yes', text: '0% químicos' },
    competition: { status: 'no', text: 'Sulfatos, parabenos' },
  },
  {
    feature: 'Propiedades anti-inflamatorias',
    artesAna: { status: 'yes', text: 'Avena + Manzanilla' },
    competition: { status: 'partial', text: 'No suele tener' },
  },
  {
    feature: 'Eco-amigable',
    artesAna: { status: 'yes', text: '100% biodegradable' },
    competition: { status: 'no', text: 'Contamina agua' },
  },
  {
    feature: 'Testado en veterinaria',
    artesAna: { status: 'yes', text: 'Formulado con expertos' },
    competition: { status: 'no', text: 'No certificado' },
  },
];

export function ComparisonSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[oklch(0.62_0.16_45)] text-white text-sm font-semibold rounded-full mb-4">
            ¿POR QUÉ ARTES_ANA?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            La diferencia está en los ingredientes
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            No es solo jabón, es salud preventiva para tu compañero
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-50">
              <div className="p-4 font-semibold text-slate-600">Característica</div>
              <div className="p-4 font-bold text-[oklch(0.62_0.16_45)] text-lg flex items-center justify-center gap-2">
                <span className="w-8 h-8 bg-[oklch(0.62_0.16_45)] rounded-lg flex items-center justify-center text-white">
                  🌿
                </span>
                Artes_Ana
              </div>
              <div className="p-4 font-semibold text-slate-600 flex items-center justify-center gap-2">
                Jabones comerciales
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-3 border-t border-gray-100"
              >
                {/* Feature Name */}
                <div className="p-4 font-medium text-slate-800 flex items-center gap-2">
                  {item.feature}
                </div>

                {/* Artes_Ana */}
                <div className="p-4 flex items-center justify-center bg-[oklch(0.98_0.01_120)]">
                  {item.artesAna.status === 'yes' && (
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">{item.artesAna.text}</span>
                    </div>
                  )}
                  {item.artesAna.status === 'partial' && (
                    <div className="flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">{item.artesAna.text}</span>
                    </div>
                  )}
                  {item.artesAna.status === 'no' && (
                    <div className="flex items-center gap-2 text-red-600">
                      <X className="h-4 w-4" />
                      <span className="text-sm">{item.artesAna.text}</span>
                    </div>
                  )}
                </div>

                {/* Competition */}
                <div className="p-4 flex items-center justify-center">
                  {item.competition.status === 'yes' && (
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">{item.competition.text}</span>
                    </div>
                  )}
                  {item.competition.status === 'partial' && (
                    <div className="flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">{item.competition.text}</span>
                    </div>
                  )}
                  {item.competition.status === 'no' && (
                    <div className="flex items-center gap-2 text-red-600">
                      <X className="h-4 w-4" />
                      <span className="text-sm">{item.competition.text}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-[oklch(0.68_0.10_165)] text-center"
          >
            <p className="text-[oklch(0.55_0.14_155)] font-semibold mb-4">
              Protege la piel de tu mascota con lo mejor de la naturaleza
            </p>
            <a
              href="/productos?categoria=pet-care"
              className="inline-flex items-center gap-2 bg-[oklch(0.62_0.16_45)] hover:bg-[oklch(0.57_0.16_45)] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Ver Línea Pet Care
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-[oklch(0.62_0.16_45)] mb-2">0%</div>
            <p className="text-sm text-slate-600">Químicos tóxicos</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[oklch(0.55_0.14_155)] mb-2">pH 7.0</div>
            <p className="text-sm text-slate-600">Balanceado</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[oklch(0.55_0.14_155)] mb-2">100%</div>
            <p className="text-sm text-slate-600">Biodegradable</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
