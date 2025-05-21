// src/app/kategori/[namaKategori]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack, // Pastikan HStack ada di sini
  Image,
  Button,
  SimpleGrid,
  Link as ChakraLink,
  Flex,
  Badge,
  Icon,
  // useColorModeValue, // Warna di-set statis untuk tema gelap
  Tag,
  Divider,
  Select,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
} from '@chakra-ui/react';
import { ExternalLinkIcon, ChatIcon, ChevronRightIcon, FilterIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';

import Navbar from '../../../components/Navbar'; // Path disesuaikan
import Footer from '../../../components/Footer';   // Path disesuaikan
import productsData from '../../../data/products.json'; // Path disesuaikan

const MotionBox = motion(Box);
const MotionContainer = motion(Container);
// const MotionHeading = motion(Heading);
// const MotionText = motion(Text);
const MotionButton = motion(Button);
// const MotionSimpleGrid = motion(SimpleGrid);

// Varian animasi
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  out: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      delay: i * 0.05, // Delay sedikit lebih cepat untuk list
    },
  }),
  hover: {
    scale: 1.03,
    borderColor: "gray.500",
    boxShadow: "0px 8px 15px rgba(255,255,255, 0.08)",
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: { scale: 0.97 }
};

const fabVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.8 } },
  hover: { scale: 1.1, boxShadow: "0px 0px 12px rgba(255,255,255,0.5)"},
  tap: { scale: 0.9 }
}

// Fungsi untuk mengubah string menjadi title case (misal: "kaos" -> "Kaos")
const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};


export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.namaKategori; // misal: "kaos", "hoodie"

  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Tema Hitam Putih (Dominan Hitam)
  const bgColor = 'black';
  const textColor = 'whiteAlpha.900';
  const headingColor = 'white';
  const subtleTextColor = 'gray.400';
  const cardBgColor = 'gray.900';
  const borderColor = 'gray.700';
  const inputBgColor = 'gray.800';
  const buttonPrimaryBg = 'white';
  const buttonPrimaryColor = 'black';
  const buttonPrimaryHoverBg = 'gray.200';
  const buttonSecondaryBorderColor = 'gray.600';

  useEffect(() => {
    if (categorySlug) {
      const currentCategoryName = toTitleCase(categorySlug.replace(/-/g, ' ')); 
      setCategoryName(currentCategoryName);

      const productsInCategory = productsData.filter(
        (product) => product.category && product.category.toLowerCase() === categorySlug.toLowerCase()
      );
      setFilteredProducts(productsInCategory);
      setIsLoading(false);
    }
  }, [categorySlug]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh" bg={bgColor}>
        <VStack spacing={4}>
          <Spinner size="xl" color="white" thickness="4px" speed="0.65s" />
          <Text color="whiteAlpha.800" fontSize="lg">Memuat Produk Kategori...</Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key={`category-${categorySlug}`}
        bg={bgColor}
        color={textColor}
        minH="100vh"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
      >
        <Navbar />

        <MotionContainer
          maxW="container.xl"
          py={{ base: 6, md: 8 }}
          variants={sectionVariants} 
          initial="hidden"
          animate="visible"
        >
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} fontSize="sm" color={subtleTextColor} mb={6}>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/" _hover={{color: 'white'}}>Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/semua-produk" _hover={{color: 'white'}}>Semua Produk</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={`/kategori/${categorySlug}`} color="white" fontWeight="medium">{categoryName || "Kategori"}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading as="h1" size={{base: "xl", md:"2xl"}} color={headingColor} mb={8} textAlign={{base: "center", md: "left"}}>
            Produk Kategori: {categoryName}
          </Heading>

          {filteredProducts.length === 0 ? (
            <Text textAlign="center" fontSize="lg" color={subtleTextColor} py={20}>
              Oops! Belum ada produk untuk kategori "{categoryName}".
            </Text>
          ) : (
            <SimpleGrid
              columns={{ base: 2, sm: 2, md: 3, lg: 4 }}
              spacing={{ base: 3, md: 5 }}
            >
              {filteredProducts.map((product, index) => (
                <MotionBox
                  key={product.id}
                  bg={cardBgColor}
                  borderRadius="lg"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor={borderColor}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.2 }}
                  custom={index} 
                  whileHover="hover"
                  whileTap="tap"
                  display="flex"
                  flexDirection="column"
                >
                  <Box
                    w="full"
                    h={{ base: "180px", sm: "200px", md: "220px", lg: "250px" }}
                    position="relative"
                    overflow="hidden"
                  >
                    <Image
                      src={product.imageUrl || '/images/distro/default-product.jpg'}
                      alt={`Foto ${product.name || 'Produk Nordz'}`}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                      fallbackSrc='/images/distro/default-product.jpg'
                      as={motion.img}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    {product.isNew && (
                       <Badge
                          position="absolute"
                          top={2.5}
                          left={2.5}
                          bg="white"
                          color="black"
                          fontSize="2xs"
                          px={2}
                          py={0.5}
                          borderRadius="md"
                          textTransform="uppercase"
                          fontWeight="bold"
                          boxShadow="sm"
                        >
                          Baru
                        </Badge>
                    )}
                  </Box>

                  <Box p={{base:3, md:4}} flexGrow={1} display="flex" flexDirection="column">
                    <Heading
                      as="h4"
                      fontSize={{ base: 'sm', md: 'md' }}
                      fontWeight="semibold"
                      noOfLines={2}
                      title={product.name}
                      color={headingColor}
                      minH={{base: "42px", md: "48px"}}
                      mb={2}
                    >
                      {product.name || "Nama Produk"}
                    </Heading>

                    {product.sizes && product.sizes.length > 0 && (
                      <HStack spacing={1} mb={2} wrap="wrap">
                        <Text fontSize="2xs" color={subtleTextColor} fontWeight="medium">Size:</Text>
                        {product.sizes.slice(0, 3).map(size => (
                          <Tag key={size} size="xs" variant="outline" colorScheme="gray" color={subtleTextColor} borderColor={borderColor} px={1.5} py={0.5}>
                            {size}
                          </Tag>
                        ))}
                        {product.sizes.length > 3 && <Tag size="xs" color={subtleTextColor}>...</Tag>}
                      </HStack>
                    )}

                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      fontWeight="bold"
                      color={headingColor}
                      mt="auto"
                      mb={3}
                    >
                      {product.price || "Harga Segera"}
                    </Text>
                    <VStack spacing={2} align="stretch">
                        <MotionButton
                          bg={buttonPrimaryBg}
                          color={buttonPrimaryColor}
                          size="sm"
                          width="full"
                          fontWeight="bold"
                          leftIcon={<ExternalLinkIcon />}
                          onClick={() => {
                              if (product.shopeeUrl) window.open(product.shopeeUrl, '_blank');
                          }}
                          isDisabled={!product.shopeeUrl}
                          _hover={{ bg: buttonPrimaryHoverBg, transform: 'translateY(-1px)', boxShadow: 'md' }}
                          boxShadow="sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Beli di Shopee
                        </MotionButton>
                        <MotionButton
                          as={NextLink}
                          href={`/produk/${product.id}`}
                          variant="outline"
                          borderColor={buttonSecondaryBorderColor}
                          color={textColor}
                          _hover={{bg: "whiteAlpha.100", borderColor: "whiteAlpha.300"}}
                          leftIcon={<InfoOutlineIcon />}
                          width="full"
                          size="sm"
                          fontWeight="bold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Lihat Detail
                        </MotionButton>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          )}
        </MotionContainer>

        <Footer />

        <MotionBox
          position="fixed"
          bottom={{ base: 4, md: 6 }}
          right={{ base: 4, md: 6 }}
          zIndex={1000}
          variants={fabVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            bg={buttonPrimaryBg}
            color={buttonPrimaryColor}
            size="lg"
            h="60px"
            px={6}
            borderRadius="full"
            boxShadow="xl"
            leftIcon={<ChatIcon />}
            onClick={() => window.open('https://wa.me/NOMOR_WHATSAPP_ANDA', '_blank')}
            _hover={{bg: buttonPrimaryHoverBg}}
          >
            Fast Respon
          </Button>
        </MotionBox>
      </MotionBox>
    </AnimatePresence>
  );
}