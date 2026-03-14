'use client';

import { useState } from 'react';
import { Star, Quote, ThumbsUp, Camera, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export interface Review {
  id: string;
  productId: string;
  productName: string;
  reviewer: {
    name: string;
    avatar?: string;
    location?: string;
  };
  rating: number;
  title?: string;
  text: string;
  images?: string[];
  date: string;
  verified: boolean;
  helpful: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    productId: 'pet-avena-manzanilla',
    productName: 'Jabón para Mascotas Avena & Manzanilla',
    reviewer: {
      name: 'María González',
      avatar: '👩',
      location: 'Miami, FL',
    },
    rating: 5,
    title: '¡Salvó la piel de mi Golden!',
    text: 'Mi perro Max tenía dermatitis desde hace meses. Después de 3 baños con este jabón ya no se rasca. La avena calma el picor y la manzanilla reduce la inflamación. Totalmente seguro si se lame.',
    images: ['/reviews/dog-bath-1.jpg', '/reviews/dog-skin-1.jpg'],
    date: 'Hace 2 semanas',
    verified: true,
    helpful: 24,
  },
  {
    id: '2',
    productId: 'facial-arroz-leche',
    productName: 'Jabón de Arroz y Leche de Cabra',
    reviewer: {
      name: 'Ana Martínez',
      avatar: '👩',
      location: 'Orlando, FL',
    },
    rating: 5,
    title: 'Aclaró mis manchas',
    text: 'Tenía manchas solares y de acné. Después de 2 semanas usando este jabón mañana y noche, mi piel está mucho más uniforme. La leche de cabra hidrata sin obstruir poros.',
    images: ['/reviews/skin-before-1.jpg', '/reviews/skin-after-1.jpg'],
    date: 'Hace 1 mes',
    verified: true,
    helpful: 18,
  },
  {
    id: '3',
    productId: 'tero-calendula-miel',
    productName: 'Jabón de Caléndula y Miel de Abejas',
    reviewer: {
      name: 'Laura Sánchez',
      avatar: '👩',
      location: 'Tampa, FL',
    },
    rating: 5,
    text: 'Mi hija tiene eczema muy sensible. Este jabón es lo único que no le irrita la piel. La miel humecta y la caléndula cicatriza. Sin fragancias, perfecto para pieles reactivas.',
    images: ['/reviews/eczema-1.jpg'],
    date: 'Hace 3 semanas',
    verified: true,
    helpful: 15,
  },
  {
    id: '4',
    productId: 'jabon-naranja-estropajo',
    productName: 'Jabón de Naranja y Estropajo',
    reviewer: {
      name: 'Carlos Rodríguez',
      avatar: '👨',
      location: 'Dallas, TX',
    },
    rating: 5,
    title: 'Exfoliación perfecta',
    text: 'El estropajo elimina células muertas y la naranja ilumina la piel. Lo uso después de correr y mis piernas se sienten suaves. Plus: el aroma cítrico es increíble.',
    images: ['/reviews/soap-lather-1.jpg'],
    date: 'Hace 1 semana',
    verified: true,
    helpful: 12,
  },
];

interface ReviewsWithPhotosProps {
  productId?: string;
  limit?: number;
  showWriteReview?: boolean;
}

export function ReviewsWithPhotos({ productId, limit = 4, showWriteReview = true }: ReviewsWithPhotosProps) {
  const [reviews, setReviews] = useState<Review[]>(
    productId ? mockReviews.filter(r => r.productId === productId) : mockReviews
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const displayedReviews = limit ? reviews.slice(0, limit) : reviews;

  const handleHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
  };

  const openImageLightbox = (review: Review, imageSrc: string) => {
    setSelectedReview(review);
    setSelectedImage(imageSrc);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold mb-2">
            Reseñas con Fotos
          </h2>
          <p className="text-muted-foreground">
            Verifica los resultados reales de nuestros clientes
          </p>
        </div>
        {showWriteReview && (
          <Button
            onClick={() => setIsWriteReviewOpen(!isWriteReviewOpen)}
            className="gap-2"
          >
            <Camera className="h-4 w-4" />
            Escribir Reseña
          </Button>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Reviewer Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl bg-terracotta/10 p-3 rounded-full">
                    {review.reviewer.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{review.reviewer.name}</h4>
                      {review.verified && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010-1.414l-9 9a1 1 0 01-1.414 0l-9-9a1 1 0 011.414-1.414L9 10.586V7a1 1 0 112 0v3.586l8.293-8.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Compra verificada
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{review.reviewer.location}</span>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[oklch(0.62_0.16_45)]" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({review.rating}/5)
                  </span>
                </div>

                {/* Title */}
                {review.title && (
                  <h5 className="font-semibold mb-2">{review.title}</h5>
                )}

                {/* Text */}
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  <Quote className="h-4 w-4 inline-block text-terracotta mr-1 opacity-50" />
                  {review.text}
                </p>

                {/* Product */}
                <p className="text-sm text-terracotta font-medium mb-4">
                  Producto: {review.productName}
                </p>

                {/* Images */}
                {review.images && review.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {review.images.map((image, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openImageLightbox(review, image)}
                        className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
                      >
                        <Image
                          src={image}
                          alt={`Foto de reseña - ${review.reviewer.name}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                          sizes="100px"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <ImageIcon className="h-6 w-6 text-white" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Helpful */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Útil ({review.helpful})
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Cerrar"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative aspect-auto bg-black rounded-lg overflow-hidden">
                <Image
                  src={selectedImage}
                  alt={`Foto de reseña de ${selectedReview.reviewer.name}`}
                  width={800}
                  height={600}
                  className="object-contain max-h-[80vh] w-auto"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white font-medium">{selectedReview.reviewer.name}</p>
                <p className="text-white/70 text-sm">{selectedReview.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Write Review Modal */}
      <AnimatePresence>
        {isWriteReviewOpen && (
          <WriteReviewModal onClose={() => setIsWriteReviewOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface WriteReviewModalProps {
  onClose: () => void;
}

function WriteReviewModal({ onClose }: WriteReviewModalProps) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold">Comparte tu Experiencia</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-3">Tu calificación *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="text-3xl transition-colors"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-[oklch(0.62_0.16_45)]'
                          : 'fill-gray-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Título de tu reseña</label>
              <input
                type="text"
                placeholder="Resumen de tu experiencia"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none"
                maxLength={100}
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Tu reseña *</label>
              <textarea
                placeholder="Cuéntanos sobre tu experiencia con el producto..."
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none resize-none"
                required
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium mb-3">Añade fotos (opcional)</label>
              <div className="grid grid-cols-3 gap-3">
                {images.map((file, idx) => (
                  <div key={idx} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Vista previa ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {images.length < 3 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-terracotta transition-colors">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Subir foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          setImages([...images, ...Array.from(e.target.files)]);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-terracotta text-white hover:bg-terracotta/90"
              >
                Publicar Reseña
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
