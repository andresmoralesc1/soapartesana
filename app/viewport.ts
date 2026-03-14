import { Viewport } from 'next'

export default function viewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'oklch(0.62 0.16 45)' },
      { media: '(prefers-color-scheme: dark)', color: 'oklch(0.145 0 0)' },
    ],
  }
}
