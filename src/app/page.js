// src/app/page.js
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Link as ChakraLink,
  Flex,
  Badge,
  Icon,
  useColorModeValue,
  Tag,
  Divider,
  Spinner,
  Image, // Menggunakan Image dari Chakra UI
  Skeleton, // Untuk skeleton loading
  SkeletonText, // Untuk skeleton loading
} from '@chakra-ui/react';
import { ExternalLinkIcon, StarIcon, ChatIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion'; // AnimatePresence dihapus dari sini
import NextImage from 'next/image';
import NextLink from 'next/link';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import productsData from '../data/products.json';


const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionChakraLink = motion(ChakraLink);

// Varian animasi
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, // Diganti ke "easeOut"
  // out: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeInOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const heroContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.4, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.07,
    },
  }),
  hover: {
    scale: 1.04,
    boxShadow: "0px 12px 24px rgba(255,255,255, 0.15)",
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  tap: { scale: 0.97 }
};

const fabVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15, delay: 1.8 } },
  hover: { scale: 1.12, boxShadow: "0px 0px 15px rgba(255,255,255,0.6)"},
  tap: { scale: 0.92 }
}

// Komponen Skeleton untuk Kartu Produk
const ProductCardSkeleton = () => {
  const cardBgColor = 'gray.900';
  const borderColor = 'gray.700';
  return (
    <MotionBox
      bg={cardBgColor}
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
    >
      <Skeleton height={{ base: "200px", sm: "220px", md: "250px" }} width="100%" />
      <Box p={4} flexGrow={1}>
        <SkeletonText mt="2" noOfLines={2} spacing="3" skeletonHeight="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="3" skeletonHeight="5" width="50%" />
        <VStack spacing={2} align="stretch" mt={4}>
          <Skeleton height="30px" borderRadius="md" />
          <Skeleton height="30px" borderRadius="md" />
        </VStack>
      </Box>
    </MotionBox>
  );
};


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const products = productsData.slice(0, 4);

  const bgColor = 'black';
  const textColor = 'whiteAlpha.900';
  const headingColor = 'white';
  const subtleTextColor = 'gray.400';
  const cardBgColor = 'gray.900';
  const borderColor = 'gray.700';
  const buttonPrimaryBg = 'white';
  const buttonPrimaryColor = 'black';
  const buttonPrimaryHoverBg = 'gray.200';
  const buttonSecondaryBorderColor = 'gray.600';


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToCatalog = () => {
    const productSection = document.getElementById('product-catalog');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Navbar /> 
        <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
          <Flex justify="space-between" align="center" mb={{ base: 6, md: 10 }}>
            <Skeleton height="30px" width="200px" />
            <Skeleton height="20px" width="100px" />
          </Flex>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 4, md: 6 }}>
            {[...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </SimpleGrid>
        </Container>
      </Box>
    );
  }

  return (
    <MotionBox
      key="homepage-grid"
      bg={bgColor}
      color={textColor}
      minH="100vh"
      variants={pageVariants}
      initial="initial"
      animate="in"
    >
      <Navbar />

      <MotionBox
        w="full"
        h={{ base: '60vh', sm: '70vh', md: '80vh', lg: '85vh' }}
        position="relative"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <NextImage
          src="/banner/nordz-banner.png"
          alt="Banner Nordz Apparel - Koleksi Terbaru"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          priority
          quality={85}
        />
        <Box position="absolute" top="0" left="0" right="0" bottom="0" bgGradient="linear(to-t, blackAlpha.800 5%, blackAlpha.600 40%, transparent 80%)" zIndex={0} />
        <Flex position="relative" zIndex={1} h="full" alignItems="center" justifyContent="center" textAlign="center" px={4}>
          <MotionBox variants={heroContentVariants} py={{ base: 6, md: 10 }}>
            <MotionHeading variants={itemVariants} as="h1" fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }} fontWeight="bold" textTransform="uppercase" color="white">
              WELCOME TO
            </MotionHeading>
            <MotionHeading variants={itemVariants} as="h2" fontSize={{ base: '3xl', sm: '5xl', md: '6xl', lg: '7xl' }} fontWeight="extrabold" textTransform="uppercase" letterSpacing="wider" color="white">
              NORDZ OFFICIAL
            </MotionHeading>
            <MotionText variants={itemVariants} fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} maxW={{ base: '90%', md: 'xl' }} mx="auto" mt={4} color="whiteAlpha.900" lineHeight="tall" >
              Temukan gaya Streetwear terbaikmu di sini. Kualitas, style, dan kenyamanan.
            </MotionText>
            <MotionButton
              variants={itemVariants}
              bg={buttonPrimaryBg}
              color={buttonPrimaryColor}
              size="lg"
              px={{base: 6, md:10}}
              py={{base: 5, md:6}}
              mt={8}
              fontWeight="bold"
              boxShadow="lg"
              _hover={{ bg: buttonPrimaryHoverBg, transform: 'translateY(-3px)', boxShadow: 'xl' }}
              onClick={handleScrollToCatalog}
              textTransform="uppercase"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              Lihat Produk Unggulan
            </MotionButton>
          </MotionBox>
        </Flex>
      </MotionBox>

      <MotionContainer
        maxW="container.md"
        py={{ base: 8, md: 12 }}
        textAlign="center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Heading as="h3" size="lg" color={headingColor} fontWeight="medium">
          Streetwear & Urban Apparel Nordz - Original & Berkualitas
        </Heading>
      </MotionContainer>

      <MotionBox variants={sectionVariants} px={{base: 4, md: 0}} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
        <Divider borderColor={borderColor} maxW="container.sm" mx="auto" />
      </MotionBox>

      <MotionContainer
        id="product-catalog"
        maxW="container.xl"
        py={{ base: 10, md: 16 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <Flex justify="space-between" align="center" mb={{ base: 6, md: 10 }}>
          <MotionHeading variants={itemVariants} as="h2" size={{ base: 'lg', md: 'xl' }} color={headingColor} fontWeight="semibold">
            Produk Unggulan
          </MotionHeading>
          <MotionChakraLink as={NextLink} href="/semua-produk" color={subtleTextColor} _hover={{ color: 'white', textDecoration:'underline' }} fontSize="sm" whileHover={{scale:1.05, color: 'white'}} whileTap={{scale:0.95}}>
            Lihat Semua
          </MotionChakraLink>
        </Flex>

        {products.length === 0 ? ( 
          <Text textAlign="center" fontSize="lg" color={subtleTextColor}>
            Produk unggulan akan segera hadir.
          </Text>
        ) : (
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            spacing={{ base: 4, md: 6 }}
          >
            {products.map((product, index) => (
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
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                whileHover="hover"
                whileTap="tap"
                display="flex"
                flexDirection="column"
              >
                <Box
                  w="full"
                  h={{ base: "200px", sm: "220px", md: "250px" }}
                  position="relative"
                  overflow="hidden"
                >
                  <Image
                    src={product.imageUrl || '/images/distro/default-product.jpg'}
                    alt={`Gambar ${product.name || 'Produk Nordz'}`}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    fallbackSrc='/images/distro/default-product.jpg'
                    as={motion.img}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {product.isNew && (
                     <Badge
                        position="absolute"
                        top={3}
                        left={3}
                        bg="white"
                        color="black"
                        fontSize="xs"
                        px={2.5}
                        py={1}
                        borderRadius="md"
                        textTransform="uppercase"
                        fontWeight="bold"
                        boxShadow="md"
                      >
                        Baru
                      </Badge>
                  )}
                   {product.category && <Tag
                      position="absolute"
                      bottom={3}
                      right={3}
                      variant="solid"
                      bg="blackAlpha.700"
                      color="whiteAlpha.900"
                      size="sm"
                      borderRadius="md"
                      px={2}
                    >
                      {product.category}
                    </Tag>}
                </Box>

                <Box p={4} flexGrow={1} display="flex" flexDirection="column">
                  <Heading
                    as="h3"
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight="semibold"
                    noOfLines={2}
                    title={product.name}
                    color={headingColor}
                    minH={{base: "48px", md: "56px"}}
                    mb={2}
                  >
                    {product.name || "Nama Produk"}
                  </Heading>

                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
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

      <MotionContainer
        maxW="container.xl"
        py={{ base: 8, md: 12 }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Flex justify="space-between" align="center" mb={{ base: 4, md: 6 }}>
          <Heading as="h2" size={{ base: 'lg', md: 'xl' }} color={headingColor} fontWeight="semibold">
            Kategori Populer
          </Heading>
           <MotionChakraLink as={NextLink} href="/semua-produk" color={subtleTextColor} _hover={{ color: 'white', textDecoration:'underline' }} fontSize="sm" whileHover={{scale:1.05, color: 'white'}} whileTap={{scale:0.95}}>
            Lihat Semua Produk
          </MotionChakraLink>
        </Flex>
        <HStack as={motion.div} variants={{visible: {transition: {staggerChildren: 0.07}}}} spacing={8} justify="center" wrap="wrap">
          {['Kaos', 'Hoodie', 'Jaket', 'Celana', 'Aksesoris'].map((categoryName) => (
            <MotionChakraLink
              as={NextLink}
              href={`/kategori/${categoryName.toLowerCase()}`}
              key={categoryName}
              variants={itemVariants}
              color={subtleTextColor}
              _hover={{color: "white", transform: "scale(1.12)", textDecoration: "none"}}
              transition={{type: "spring", stiffness:280, damping:12}}
              cursor="pointer"
              display="inline-block"
            >
              <Text fontSize={{base: "md", md: "lg"}} fontWeight="semibold">
                {categoryName}
              </Text>
            </MotionChakraLink>
          ))}
        </HStack>
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
  );
}
