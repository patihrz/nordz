// src/components/Footer.js
'use client';

import {
  Box,
  Container,
  Text,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
  Stack,
  SimpleGrid, 
  IconButton, 
  Divider,
  VStack,
  // Heading, // Tidak digunakan lagi untuk brandName teks
  Flex, 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import NextLink from 'next/link';
import NextImage from 'next/image'; // Import NextImage untuk logo

const MotionBox = motion(Box);
const MotionChakraLink = motion(ChakraLink);
const MotionIconButton = motion(IconButton);

// Definisikan grup link
const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'bold'} fontSize={'lg'} mb={2} textTransform="uppercase" letterSpacing="wider">
      {children}
    </Text>
  );
};

const footerLinkGroups = [
  {
    title: 'Toko Kami',
    links: [
      { label: 'Tentang Nordz', href: '/tentang-kami' },
      { label: 'Semua Produk', href: '/semua-produk' },
      { label: 'Koleksi Terbaru', href: '#' },
      { label: 'Blog/Artikel', href: '/blog' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
      { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
    ],
  },
];


export default function Footer({ 
  logoAltText = "Nordz Apparel Logo" // Default alt text untuk logo
}) {
  const footerBgColor = useColorModeValue('gray.50', 'black'); 
  const footerTextColor = useColorModeValue('gray.700', 'whiteAlpha.800');
  // const headingColor = useColorModeValue('blackAlpha.800', 'white'); // Tidak digunakan lagi untuk brandName
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const linkHoverColor = useColorModeValue('black', 'white'); 
  const iconHoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
  };

  const columnVariants = {
    hidden: { opacity:0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  const linkItemVariants = {
      hover: { scale: 1.05, x: 3, color: linkHoverColor, transition: { type: "spring", stiffness: 400, damping: 10 } },
      tap: { scale: 0.95 }
  }

  const socialButtonVariants = {
    hover: { scale: 1.15, rotate: 5, backgroundColor: iconHoverBg, transition: { type: "spring", stiffness: 300, damping: 10 } },
    tap: { scale: 0.9 }
  }

  return (
    <MotionBox
      as="footer"
      bg={footerBgColor}
      color={footerTextColor}
      borderTopWidth="1px"
      borderColor={borderColor}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }}
    >
      <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} mb={8}>
          {/* Kolom Brand/Logo */}
          <MotionBox variants={columnVariants}>
            <VStack align={{base: "center", sm: "flex-start"}} spacing={4}>
              {/* Menggunakan NextImage untuk Logo */}
              <MotionChakraLink
                as={NextLink}
                href="/"
                _hover={{ textDecoration: 'none' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextImage
                  src="/icons/nordz-logo.png" // Path ke logo di folder public
                  alt={logoAltText}
                  width={120} // Sesuaikan lebar logo untuk footer
                  height={36} // Sesuaikan tinggi logo untuk footer
                  style={{ filter: footerBgColor === 'black' ? 'invert(1) grayscale(1) brightness(2)' : 'none' }} // Agar logo putih di background hitam
                />
              </MotionChakraLink>
              <Text fontSize="sm" textAlign={{base: "center", sm: "left"}}>
                Gaya Streetwear autentik untuk jiwa muda yang berani dan ekspresif.
              </Text>
            </VStack>
          </MotionBox>

          {/* Kolom Link Dinamis */}
          {footerLinkGroups.map((group) => (
            <MotionBox key={group.title} variants={columnVariants}>
              <VStack align={{base: "center", sm: "flex-start"}} spacing={4}>
                <ListHeader>{group.title}</ListHeader>
                {group.links.map((link) => (
                  <MotionChakraLink
                    key={link.label}
                    as={NextLink}
                    href={link.href}
                    fontSize="sm"
                    _hover={{ textDecoration: 'none' }} 
                    variants={linkItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {link.label}
                  </MotionChakraLink>
                ))}
              </VStack>
            </MotionBox>
          ))}

          {/* Kolom Sosial Media */}
          <MotionBox variants={columnVariants}>
            <VStack align={{base: "center", sm: "flex-start"}} spacing={4}>
              <ListHeader>Ikuti Kami</ListHeader>
              <HStack spacing={4} justify={{ base: 'center', sm: 'flex-start'}}>
                <MotionIconButton
                  as="a"
                  href="https://instagram.com" // Ganti dengan URL Instagram Anda
                  target="_blank"
                  aria-label="Instagram Nordz"
                  icon={<FaInstagram size="20px" />}
                  variant="ghost"
                  color={footerTextColor}
                  _hover={{ bg: 'transparent' }} 
                  variants={socialButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                />
                <MotionIconButton
                  as="a"
                  href="https://tiktok.com" // Ganti dengan URL TikTok Anda
                  target="_blank"
                  aria-label="TikTok Nordz"
                  icon={<FaTiktok size="20px" />}
                  variant="ghost"
                  color={footerTextColor}
                  _hover={{ bg: 'transparent' }}
                  variants={socialButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                />
                <MotionIconButton
                  as="a"
                  href="https://wa.me/NOMOR_WHATSAPP_ANDA" // Ganti dengan link WhatsApp Anda
                  target="_blank"
                  aria-label="WhatsApp Nordz"
                  icon={<FaWhatsapp size="20px" />}
                  variant="ghost"
                  color={footerTextColor}
                  _hover={{ bg: 'transparent' }}
                  variants={socialButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                />
              </HStack>
              <Text fontSize="xs" mt={2} textAlign={{base: "center", sm: "left"}}>
                Dapatkan update terbaru & promo spesial!
              </Text>
            </VStack>
          </MotionBox>
        </SimpleGrid>

        <Divider my={{base: 6, md: 8}} borderColor={borderColor} />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          fontSize="sm"
        >
          <Text mb={{ base: 2, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
            &copy; {new Date().getFullYear()} Nordz. {/* Langsung tulis Nordz */}
          </Text>
          <Text textAlign={{ base: 'center', md: 'right' }}>
            Didesain & Dikembangkan dengan ❤️ oleh Patih Ramadika
          </Text>
        </Flex>
      </Container>
    </MotionBox>
  );
}
