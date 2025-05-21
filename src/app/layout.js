// src/app/layout.js
'use client'; // Layout bisa menjadi client component jika menggunakan AnimatePresence

import { Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers'; // Asumsi providers.js sudah ada untuk ChakraProvider
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'; // Untuk mendapatkan path URL sebagai key

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

// Tidak perlu export metadata di sini jika sudah dihandle Providers atau page-specific
// export const metadata = {
//   title: 'Nordz Apparel',
//   description: 'Streetwear & Urban Apparel Nordz - Original & Berkualitas',
// };

// Varian untuk animasi transisi halaman
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    // x: "-100vw", // Contoh animasi slide dari kiri
    // scale: 0.95,
    y: 15,
  },
  in: {
    opacity: 1,
    // x: 0,
    // scale: 1,
    y: 0,
    transition: {
      duration: 0.5, // Durasi animasi masuk
      ease: [0.42, 0, 0.58, 1], // Cubic bezier untuk easing yang smooth
      // type: "spring", stiffness: 100, damping: 20 // Alternatif dengan spring
    },
  },
  out: {
    opacity: 0,
    // x: "100vw", // Contoh animasi slide ke kanan
    // scale: 1.05,
    y: -15,
    transition: {
      duration: 0.3, // Durasi animasi keluar
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Mendapatkan path URL saat ini

  return (
    <html lang="id" className={poppins.variable}>
      <body>
        <Providers> {/* ChakraProvider dan theme ada di dalam Providers */}
          <AnimatePresence mode="wait"> {/* mode="wait" agar animasi keluar selesai sebelum animasi masuk dimulai */}
            <motion.main
              key={pathname} // Key unik berdasarkan path, penting untuk AnimatePresence
              variants={pageTransitionVariants}
              initial="initial"
              animate="in"
              exit="out"
              // style={{ overflowX: 'hidden' }} // Opsional: mencegah horizontal scrollbar saat transisi slide
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </Providers>
      </body>
    </html>
  );
}
