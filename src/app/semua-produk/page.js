// src/app/kategori/[namaKategori]/page.js // Ini sebenarnya adalah /semua-produk/page.js
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  SimpleGrid,
  Link as ChakraLink,
  Flex,
  Badge,
  Icon,
  Tag,
  Divider,
  Select,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  CheckboxGroup, // Untuk filter multiple
  Checkbox, // Untuk filter multiple
} from '@chakra-ui/react';
import { ExternalLinkIcon, ChatIcon, ChevronRightIcon, FilterIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';

import Navbar from '../../components/Navbar'; // Path disesuaikan untuk /semua-produk
import Footer from '../../components/Footer';   // Path disesuaikan
import productsData from '../../data/products.json'; // Path disesuaikan

const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionButton = motion(Button);

// Varian animasi
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  out: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const itemVariants = { 
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
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
      delay: i * 0.05,
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

// Daftar kategori unik dari data produk
const uniqueCategories = ["Semua Kategori", ...new Set(productsData.map(p => p.category).filter(Boolean))];
// Daftar ukuran unik dari data produk
const allSizes = [...new Set(productsData.flatMap(p => p.sizes || []))].sort();


export default function SemuaProdukPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentProducts, setCurrentProducts] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedSizes, setSelectedSizes] = useState([]); 
  const [sortOption, setSortOption] = useState("relevan");

  const bgColor = 'black';
  const textColor = 'whiteAlpha.900'; // Warna teks default untuk komponen (putih di bg hitam)
  const headingColor = 'white';
  const subtleTextColor = 'gray.400';
  const cardBgColor = 'gray.900'; // Background kartu produk dan elemen UI gelap lainnya
  const borderColor = 'gray.700';
  const inputBgColor = 'gray.800'; // Background untuk Select box
  const buttonPrimaryBg = 'white';
  const buttonPrimaryColor = 'black'; // Warna teks untuk tombol utama (hitam di bg putih)
  const buttonPrimaryHoverBg = 'gray.200';
  const buttonSecondaryBorderColor = 'gray.600';

  // Warna untuk teks di dalam option dropdown (jika dropdownnya putih)
  const optionTextColor = 'black'; // Teks hitam untuk kontras di dropdown putih
  const optionBgColor = 'white'; // Background putih untuk option

  const applyFiltersAndSort = useCallback(() => {
    let productsToDisplay = [...productsData];

    if (selectedCategory !== "Semua Kategori") {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedSizes.length > 0) {
      productsToDisplay = productsToDisplay.filter((product) =>
        product.sizes && product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    switch (sortOption) {
      case "termurah":
        productsToDisplay.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.price.replace(/[^0-9.-]+/g,"")));
        break;
      case "termahal":
        productsToDisplay.sort((a, b) => parseFloat(b.price.replace(/[^0-9.-]+/g,"")) - parseFloat(a.price.replace(/[^0-9.-]+/g,"")));
        break;
      case "terbaru":
        productsToDisplay.sort((a,b) => (a.isNew === b.isNew)? 0 : a.isNew? -1 : 1);
        break;
      case "relevan":
      default:
        break;
    }
    setCurrentProducts(productsToDisplay);
  }, [selectedCategory, selectedSizes, sortOption]);


  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      applyFiltersAndSort();
      setIsLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, [applyFiltersAndSort]); 

  const handleSizeChange = (newSizes) => {
    setSelectedSizes(newSizes);
  };

  if (isLoading && currentProducts.length === 0) { 
    return (
      <Flex justify="center" align="center" h="100vh" bg={bgColor}>
        <VStack spacing={4}>
          <Spinner size="xl" color="white" thickness="4px" speed="0.65s" />
          <Text color="whiteAlpha.800" fontSize="lg">Memuat Produk Nordz...</Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key="semua-produk-page-filtered"
        bg={bgColor}
        color={textColor} // Warna teks default untuk halaman
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
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/semua-produk" color="white" fontWeight="medium">Semua Produk</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading as="h1" size={{base: "xl", md:"2xl"}} color={headingColor} mb={8} textAlign={{base: "center", md: "left"}}>
            Semua Produk Nordz
          </Heading>

          <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 6, lg: 8 }} align="flex-start">
            {/* Kolom Filter */}
            <MotionBox
              w={{ base: 'full', lg: '280px' }}
              p={6}
              bg={cardBgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              position={{ lg: 'sticky' }}
              top={{ lg: '100px' }}
              variants={itemVariants} 
              initial="hidden"       
              whileInView="visible"  
              viewport={{once: true, amount: 0.3}} 
            >
              <Heading size="md" mb={5} color={headingColor}>
                <Icon as={FilterIcon} mr={2} /> Filter Produk
              </Heading>
              <VStack spacing={5} align="stretch">
                <Box>
                  <Text fontWeight="semibold" mb={2}>Kategori</Text>
                  <Select 
                    placeholder="Pilih Kategori" 
                    bg={inputBgColor} 
                    borderColor={borderColor} 
                    _focus={{borderColor: 'gray.500'}} 
                    _hover={{borderColor: 'gray.600'}} 
                    color={textColor} // Warna teks untuk Select box yang tertutup
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {uniqueCategories.map(cat => (
                      // Style untuk option di dalam dropdown
                      <option key={cat} style={{backgroundColor: optionBgColor, color: optionTextColor}} value={cat}> 
                        {cat === "Semua Kategori" ? "Semua Kategori" : cat}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Text fontWeight="semibold" mb={2}>Ukuran</Text>
                  <CheckboxGroup colorScheme="gray" value={selectedSizes} onChange={handleSizeChange}>
                    <SimpleGrid columns={{base:3, sm:4}} spacing={2}>
                        {allSizes.map(size => (
                            <Checkbox key={size} value={size} borderColor={borderColor} 
                                _hover={{bg: 'whiteAlpha.100'}}
                                _checked={{
                                    bg: buttonPrimaryBg,
                                    color: buttonPrimaryColor,
                                    borderColor: buttonPrimaryBg,
                                    iconColor: buttonPrimaryColor,
                                    "& .chakra-checkbox__control": { 
                                        bg: buttonPrimaryBg,
                                        borderColor: buttonPrimaryBg,
                                        _hover: {bg: buttonPrimaryHoverBg}
                                    },
                                    "& .chakra-checkbox__label": { 
                                        color: buttonPrimaryColor,
                                        fontWeight: 'bold'
                                    }
                                }}
                            >
                                <Text fontSize="sm" color={selectedSizes.includes(size) ? buttonPrimaryColor : textColor}>{size}</Text>
                            </Checkbox>
                        ))}
                    </SimpleGrid>
                  </CheckboxGroup>
                </Box>
                <Box>
                  <Text fontWeight="semibold" mb={2}>Rentang Harga</Text>
                  <Text fontSize="xs" color={subtleTextColor}>Fitur ini akan segera hadir.</Text>
                </Box>
              </VStack>
            </MotionBox>

            {/* Kolom Produk */}
            <MotionBox flex="1"> 
              <Flex justify="space-between" align="center" mb={6} direction={{base: "column", sm: "row"}} gap={4}>
                <Text fontSize="sm" color={subtleTextColor}>
                  Menampilkan {currentProducts.length} dari {productsData.length} produk
                </Text>
                <Select
                  placeholder="Urutkan berdasarkan"
                  w={{ base: 'full', sm: '220px' }}
                  bg={inputBgColor}
                  borderColor={borderColor}
                  _focus={{borderColor: 'gray.500'}}
                  _hover={{borderColor: 'gray.600'}}
                  size="sm"
                  color={textColor} // Warna teks untuk Select box yang tertutup
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  {/* Style untuk option di dalam dropdown */}
                  <option style={{backgroundColor: optionBgColor, color: optionTextColor}} value="relevan">Paling Relevan</option>
                  <option style={{backgroundColor: optionBgColor, color: optionTextColor}} value="termurah">Harga: Termurah</option>
                  <option style={{backgroundColor: optionBgColor, color: optionTextColor}} value="termahal">Harga: Termahal</option>
                  <option style={{backgroundColor: optionBgColor, color: optionTextColor}} value="terbaru">Produk Terbaru</option>
                </Select>
              </Flex>

              {isLoading && currentProducts.length > 0 ? ( 
                 <Flex justify="center" align="center" minH="300px">
                    <Spinner size="lg" color="white" thickness="3px" speed="0.65s" />
                 </Flex>
              ) : currentProducts.length === 0 ? (
                <Text textAlign="center" fontSize="lg" color={subtleTextColor} py={20}>
                  Oops! Tidak ada produk yang cocok dengan filter Anda.
                </Text>
              ) : (
                <SimpleGrid
                  columns={{ base: 2, sm:2, md: 2, lg: 3 }}
                  spacing={{ base: 3, md: 5 }}
                >
                  {currentProducts.map((product, index) => (
                    <MotionBox
                      key={product.id}
                      bg={cardBgColor}
                      borderRadius="lg"
                      overflow="hidden"
                      borderWidth="1px"
                      borderColor={borderColor}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible" 
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
                              color={textColor} // Warna teks tombol detail disamakan dengan teks halaman
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
            </MotionBox>
          </Stack>
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
