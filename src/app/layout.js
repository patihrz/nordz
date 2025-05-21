// src/app/layout.js
'use client'; 

import { Poppins } from 'next/font/google';
import Head from 'next/head'; // Import Head dari next/head
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
      <Head>
        {/* Judul default untuk semua halaman ditambahkan di sini */}
        <title>Nordz Apparel - Streetwear & Urban Apparel</title>
        {/* Deskripsi default juga bisa ditambahkan di sini jika perlu */}
        <meta name="description" content="Temukan koleksi streetwear dan urban apparel original dari Nordz. Kualitas, style, dan kenyamanan untuk gaya terbaikmu." />
        {/* Tambahkan tag meta lain yang relevan untuk seluruh situs di sini */}
        <meta name="keywords" content="nordz, streetwear, urban apparel, kaos distro, hoodie, fashion pria, fashion wanita" />
        <link rel="icon" href="/favicon.ico" /> {/* Pastikan favicon.ico ada di folder public */}
      </Head>
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
