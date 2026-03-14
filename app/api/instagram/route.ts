import { NextResponse } from 'next/server';

// Instagram Basic Display API configuration
// Note: You need to set up Instagram Basic Display API and get an access token
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID || '';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';

export async function GET(request: Request) {
  try {
    if (!INSTAGRAM_ACCESS_TOKEN) {
      // Return mock data for development
      return NextResponse.json({
        data: getMockPosts(),
      });
    }

    // Fetch from Instagram Basic Display API
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&limit=${12}&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Instagram API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Instagram API error:', error);
    // Return mock data on error
    return NextResponse.json({
      data: getMockPosts(),
    });
  }
}

function getMockPosts() {
  return [
    {
      id: '1',
      caption: '¡Jabón de avena y manzanilla para tu mejor amigo! 🐕✨ El alivio natural para piel sensible.',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1581889470531-11e8fe1c3e7b?w=400',
      permalink: 'https://instagram.com/p/1',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      like_count: 142,
      comments_count: 23,
    },
    {
      id: '2',
      caption: 'Jabón de carbón activado: detox profundo para tu piel 🌿',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1608571423902-eed4a2e649d9?w=400',
      permalink: 'https://instagram.com/p/2',
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      like_count: 98,
      comments_count: 15,
    },
    {
      id: '3',
      caption: 'Ingredientes orgánicos, amor artesanal 🧡‍🔥 Cada barra es única.',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1608571423902-eed4a2e649d9?w=400',
      permalink: 'https://instagram.com/p/3',
      timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
      like_count: 187,
      comments_count: 34,
    },
    {
      id: '4',
      caption: 'Línea energética: Limpieza de cuerpo y espíritu 🌙✨',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1610987358161-84fb6e90f5ac?w=400',
      permalink: 'https://instagram.com/p/4',
      timestamp: new Date(Date.now() - 86400000 * 10).toISOString(),
      like_count: 156,
      comments_count: 28,
    },
  ];
}
