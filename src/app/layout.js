// src/app/layout.js
'use client'; 

import { Poppins } from 'next/font/google';
// Head dari next/head tidak digunakan jika kita set manual di tag <head> HTML
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
      {/* Pastikan tidak ada spasi atau baris baru yang tidak perlu di dalam <head> */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nordz Apparel</title>
        <meta name="description" content="Deskripsi default Nordz Apparel." />
        <link rel="icon" href="public/icons/nordz-logo.png" />
        {/* Tambahkan tag meta lain jika perlu, pastikan tidak ada whitespace antar tag */}
      </head>
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
