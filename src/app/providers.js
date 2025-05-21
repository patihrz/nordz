// src/app/providers.js
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Perluas tema untuk menyertakan Poppins sebagai font default
const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  // Anda bisa menambahkan kustomisasi tema lainnya di sini
  // Misalnya, untuk animasi yang lebih smooth secara default:
  components: {
    Button: {
      baseStyle: {
        transition: 'all 0.2s ease-in-out',
      },
    },
    Link: {
      baseStyle: {
        transition: 'color 0.2s ease-in-out',
      },
    },
    Box: {
        baseStyle: {
            transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
        }
    }
  },
  styles: {
    global: {
      // Contoh untuk scroll behavior yang lebih halus
      // 'html, body': {
      //   scrollBehavior: 'smooth',
      // },
    },
  },
});

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}> {/* Terapkan tema kustom */}
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}