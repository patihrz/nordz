// src/app/layout.js
'use client'; 

import { Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers'; 
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'; 

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

// Metadata default untuk seluruh aplikasi
export const metadata = {
  title: 'Nordz Apparel - Streetwear & Urban Apparel',
  description: 'Temukan koleksi streetwear dan urban apparel original dari Nordz. Kualitas, style, dan kenyamanan untuk gaya terbaikmu.',
  // Anda bisa menambahkan metadata lain di sini jika perlu, seperti:
  // keywords: 'nordz, streetwear, urban apparel, kaos distro, hoodie, fashion pria, fashion wanita',
  // openGraph: {
  //   title: 'Nordz Apparel',
  //   description: 'Streetwear & Urban Apparel Original dan Berkualitas.',
  //   images: [
  //     {
  //       url: '/icons/nordz-logo.png', // Path ke logo Anda di folder public
  //       width: 800, // Sesuaikan
  //       height: 600, // Sesuaikan
  //       alt: 'Nordz Apparel Logo',
  //     },
  //   ],
  //   siteName: 'Nordz Apparel',
  // },
};

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, 
      ease: [0.42, 0, 0.58, 1], 
    },
  },
  out: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3, 
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function RootLayout({ children }) {
  const pathname = usePathname(); 

  return (
    <html lang="id" className={poppins.variable}>
      <body>
        <Providers> 
          <AnimatePresence mode="wait"> 
            <motion.main
              key={pathname} 
              variants={pageTransitionVariants}
              initial="initial"
              animate="in"
              exit="out"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </Providers>
      </body>
    </html>
  );
}
