'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramFeedProps {
  username?: string;
  limit?: number;
  showHeader?: boolean;
}

const MOCK_POSTS: InstagramPost[] = [
  {
    id: '1',
    caption: '¡Jabón de avena y manzanilla para tu mejor amigo! 🐕✨ El alivio natural para piel sensible. #JabonesArtesanales #PetCare #Dermatitis',
    media_type: 'IMAGE',
    media_url: '/instagram/post-1.jpg',
    permalink: 'https://instagram.com/p/1',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    like_count: 142,
    comments_count: 23,
  },
  {
    id: '2',
    caption: 'Nuestro jabón de carbón activado es detox profundo para tu piel 🌿 Pores minimizados, piel limpia. #Skincare #CarbonSoap',
    media_type: 'IMAGE',
    media_url: '/instagram/post-2.jpg',
    permalink: 'https://instagram.com/p/2',
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
    like_count: 98,
    comments_count: 15,
  },
  {
    id: '3',
    caption: 'Ingredientes orgánicos, amor artesanal 🧡‍🔥 Cada barra es única, como tú. #Handmade #NaturalBeauty',
    media_type: 'IMAGE',
    media_url: '/instagram/post-3.jpg',
    permalink: 'https://instagram.com/p/3',
    timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
    like_count: 187,
    comments_count: 34,
  },
  {
    id: '4',
    caption: 'Línea energética: Limpieza de cuerpo y espíritu 🌙✨ Sal rosada del Himalaya + ruda sagrada. #Energía #LimpiezaEnergética',
    media_type: 'IMAGE',
    media_url: '/instagram/post-4.jpg',
    permalink: 'https://instagram.com/p/4',
    timestamp: new Date(Date.now() - 86400000 * 10).toISOString(),
    like_count: 156,
    comments_count: 28,
  },
];

export function InstagramFeed({
  username = 'artes_ana',
  limit = 4,
  showHeader = true,
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch from API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/instagram');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data || MOCK_POSTS.slice(0, limit));
        } else {
          // Use mock data on error
          setPosts(MOCK_POSTS.slice(0, limit));
        }
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        // Use mock data on error
        setPosts(MOCK_POSTS.slice(0, limit));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  if (loading) {
    return (
      <div className="py-12 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-terracotta" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Instagram className="h-8 w-8 text-rose-500" />
              <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 text-sm font-semibold rounded-full">
                SÍGUENOS EN INSTAGRAM
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              @Artes_Ana
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Únete a nuestra comunidad. Comparte tus experiencias y descubre contenido exclusivo.
            </p>
          </motion.div>
        )}

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square group overflow-hidden rounded-lg shadow-md cursor-pointer"
            >
              <Link
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Icons */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-sm">
                        <Heart className="h-4 w-4 fill-white" />
                        {post.like_count || 0}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <MessageCircle className="h-4 w-4 fill-white" />
                        {post.comments_count || 0}
                      </span>
                    </div>
                    <Instagram className="h-5 w-5" />
                  </div>
                </div>

                {/* Play icon for video */}
                {post.media_type === 'VIDEO' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-3">
                      <svg className="h-6 w-6 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Carousel indicator */}
                {post.media_type === 'CAROUSEL_ALBUM' && (
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 mx-auto">
              <Instagram className="h-5 w-5" />
              Seguir @Artes_Ana
            </button>
          </Link>
          <p className="text-sm text-slate-500 mt-4">
            Comparte tus experiencias con nuestros productos usando el hashtag
            <span className="font-semibold text-terracotta"> #ArtesAna</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * InstagramPostEmbed - Component to embed a single Instagram post
 */
interface InstagramPostEmbedProps {
  postUrl: string;
  className?: string;
}

export function InstagramPostEmbed({ postUrl, className }: InstagramPostEmbedProps) {
  return (
    <div className={className}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{ background: '#FFF', border: 0, borderRadius: 3, boxShadow: '0 0 1px 0 rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.1)' }}
      />
    </div>
  );
}
