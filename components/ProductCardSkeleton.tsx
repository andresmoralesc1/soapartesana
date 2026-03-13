'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function ProductCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-gray-200 bg-white">
        {/* Image skeleton */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <CardContent className="p-5">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded mb-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Description skeleton */}
          <div className="h-4 bg-gray-100 rounded mb-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.1,
              }}
            />
          </div>
          <div className="h-4 bg-gray-100 rounded w-3/4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.2,
              }}
            />
          </div>

          {/* Price and badge skeleton */}
          <div className="flex items-center justify-between mt-4">
            <div className="h-8 w-20 bg-gray-200 rounded overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.3,
                }}
              />
            </div>
            <div className="h-6 w-24 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.4,
                }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 gap-3">
          {/* Button skeleton */}
          <div className="flex-1 h-10 bg-gray-200 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.5,
              }}
            />
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.6,
              }}
            />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
