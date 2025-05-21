// src/app/produk/[id]/page.js
'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  // useColorModeValue, // Warna di-set statis untuk tema gelap
  Tag,
  Divider,
  Spinner,
  Image,
  AspectRatio,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Wrap, // Tetap digunakan untuk menampilkan daftar ukuran
  WrapItem,
  // useToast, // Tidak digunakan lagi untuk pemilihan ukuran
  Grid,
  GridItem,
  // Circle, // Tidak digunakan lagi untuk pilihan warna
} from '@chakra-ui/react';
import { ExternalLinkIcon, ChatIcon, ChevronRightIcon, /*CheckCircleIcon,*/ InfoOutlineIcon } from '@chakra-ui/icons'; // CheckCircleIcon tidak digunakan lagi
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import productsData from '../../../data/products.json';

const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionChakraLink = motion(ChakraLink);

// Varian animasi
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  out: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const imageGalleryVariants = {
  hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.3)", transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

const relatedCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      delay: i * 0.07,
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


export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  // const [selectedSize, setSelectedSize] = useState(''); // Tidak digunakan lagi
  // const [selectedColor, setSelectedColor] = useState(null); // Tidak digunakan lagi
  const [isLoading, setIsLoading] = useState(true);
  // const toast = useToast(); // Tidak digunakan lagi untuk pemilihan ukuran

  useEffect(() => {
    if (productId) {
      const foundProduct = productsData.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        const initialImage = 
          (foundProduct.galleryImages && foundProduct.galleryImages.length > 0 
            ? foundProduct.galleryImages[0] 
            : foundProduct.imageUrl) 
          || '/images/distro/default-product.jpg';
        setSelectedImage(initialImage);
        // Tidak ada lagi setSelectedColor
      } else {
        console.error("Produk tidak ditemukan, mengalihkan...");
        router.push('/404');
      }
      setIsLoading(false);
    }
  }, [productId, router]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    let RProducts = productsData.filter(p => p.id !== product.id);
    const sameCategoryProducts = RProducts.filter(p => p.category === product.category);
    if (sameCategoryProducts.length >= 3) {
      return sameCategoryProducts.slice(0, 3);
    } else {
      const otherProducts = RProducts.filter(p => p.category !== product.category);
      return [...sameCategoryProducts, ...otherProducts.slice(0, 3 - sameCategoryProducts.length)];
    }
  }, [product]);

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

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh" bg={bgColor}>
        <VStack spacing={4}>
          <Spinner size="xl" color="white" thickness="4px" speed="0.65s" />
          <Text color="whiteAlpha.800" fontSize="lg">Memuat Detail Produk...</Text>
        </VStack>
      </Flex>
    );
  }

  if (!product) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Navbar />
        <Container textAlign="center" py={20}>
          <Heading color={headingColor}>Oops! Produk Tidak Ditemukan.</Heading>
          <Text color={subtleTextColor} mt={4}>
            Produk yang Anda cari mungkin sudah tidak tersedia atau URL salah.
          </Text>
          <Button as={NextLink} href="/semua-produk" mt={8} bg={buttonPrimaryBg} color={buttonPrimaryColor} _hover={{bg: buttonPrimaryHoverBg}}>
            Kembali ke Semua Produk
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  const galleryImages = 
    product.galleryImages && product.galleryImages.length > 0 
      ? product.galleryImages 
      : (product.imageUrl ? [product.imageUrl] : ['/images/distro/default-product.jpg']);

  // handleSizeSelect tidak diperlukan lagi
  // handleColorSelect tidak diperlukan lagi

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key={`product-detail-${productId}`}
        bg={bgColor}
        color={textColor}
        minH="100vh"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
      >
        <Navbar />

        <MotionContainer maxW="container.xl" py={{ base: 6, md: 10 }} variants={sectionVariants} initial="hidden" animate="visible">
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} fontSize="sm" color={subtleTextColor} mb={8}>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/" _hover={{color: 'white'}}>Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/semua-produk" _hover={{color: 'white'}}>Semua Produk</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={`/produk/${product.id}`} color="white" fontWeight="medium" noOfLines={1} maxW="300px">
                {product.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Grid templateColumns={{ base: '1fr', md: '1.5fr 2fr', lg: '1fr 1.5fr' }} gap={{ base: 8, md: 12 }}>
            <GridItem as={MotionBox} variants={itemVariants}>
              <VStack spacing={4} align="stretch" position={{md: "sticky"}} top={{md: "100px"}}>
                <MotionBox
                  w="full"
                  bg={cardBgColor}
                  borderRadius="xl"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor={borderColor}
                  boxShadow="2xl"
                  whileHover={{scale: 1.02, transition: {duration: 0.2}}}
                >
                  <AspectRatio ratio={1} w="full">
                    <Image
                      src={selectedImage}
                      alt={`Gambar utama ${product.name}`}
                      objectFit="cover"
                      fallbackSrc="/images/distro/default-product.jpg"
                      borderRadius="lg"
                      as={motion.img}
                      initial={{opacity:0, scale: 0.95}}
                      animate={{opacity:1, scale: 1}}
                      transition={{duration:0.4, ease:"easeOut"}}
                      key={selectedImage} 
                    />
                  </AspectRatio>
                </MotionBox>
                {galleryImages.length > 1 && (
                  <HStack spacing={3} overflowX="auto" py={2} 
                    css={{ /* Styling scrollbar */ }}
                  >
                    {galleryImages.map((imgUrl, index) => (
                      <MotionBox
                        key={index}
                        as="button"
                        w={{base: "75px", md:"90px"}}
                        h={{base: "75px", md:"90px"}}
                        minW={{base: "75px", md:"90px"}}
                        borderRadius="lg"
                        overflow="hidden"
                        borderWidth="3px"
                        borderColor={selectedImage === imgUrl ? buttonPrimaryBg : 'transparent'}
                        onClick={() => setSelectedImage(imgUrl)}
                        variants={imageGalleryVariants}
                        whileHover="hover"
                        whileTap="tap"
                        boxShadow={selectedImage === imgUrl ? `0 0 0 3px ${buttonPrimaryBg}` : "lg"}
                        opacity={selectedImage === imgUrl ? 1 : 0.65}
                        transition="all 0.2s ease-in-out"
                      >
                        <Image
                          src={imgUrl}
                          alt={`Thumbnail ${index + 1} ${product.name}`}
                          objectFit="cover"
                          w="full"
                          h="full"
                          fallbackSrc="/images/distro/default-product.jpg"
                        />
                      </MotionBox>
                    ))}
                  </HStack>
                )}
              </VStack>
            </GridItem>

            <GridItem as={MotionBox} variants={itemVariants}>
              <VStack spacing={6} align="stretch">
                {product.isNew && (
                  <Badge bg="white" color="black" variant="solid" alignSelf="flex-start" px={3.5} py={1.5} borderRadius="md" fontWeight="bold" boxShadow="md" fontSize="sm">
                    BARU
                  </Badge>
                )}
                <MotionHeading variants={itemVariants} as="h1" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} color={headingColor} fontWeight="extrabold" lineHeight="tight">
                  {product.name}
                </MotionHeading>
                
                {product.category && (
                  <Text fontSize="md" color={subtleTextColor}>
                    Kategori: <ChakraLink as={NextLink} href={`/kategori/${product.category.toLowerCase().replace(/\s+/g, '-')}`} fontWeight="semibold" _hover={{textDecoration: 'underline', color: 'white'}}>{product.category}</ChakraLink>
                  </Text>
                )}

                <MotionText variants={itemVariants} fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color={headingColor}>
                  {product.price}
                </MotionText>

                <Divider borderColor={borderColor} my={2}/>

                <MotionBox variants={itemVariants}>
                  <Heading size="sm" mb={2} color={headingColor} textTransform="uppercase" letterSpacing="wide">Deskripsi Lengkap</Heading>
                  <Text fontSize="sm" lineHeight="tall" color={textColor} whiteSpace="pre-wrap">
                    {product.longDescription || product.description || "Deskripsi produk belum tersedia."}
                  </Text>
                </MotionBox>

                {/* Pilihan Warna Dihilangkan */}
                {/* {product.colors && product.colors.length > 0 && ( ... )} */}

                {/* Ukuran Tersedia (Bukan Pilihan) */}
                {product.sizes && product.sizes.length > 0 && (
                  <MotionBox variants={itemVariants}>
                    <Heading size="sm" mb={3} color={headingColor} textTransform="uppercase" letterSpacing="wide">Ukuran Tersedia</Heading>
                    <Wrap spacing={2}> {/* Spacing dikurangi sedikit */}
                      {product.sizes.map((size) => (
                        <WrapItem key={size}>
                          <Tag size="md" variant="outline" colorScheme="gray" color={subtleTextColor} borderColor={borderColor} px={3} py={1.5} borderRadius="md">
                            {size}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </MotionBox>
                )}
                
                <Divider borderColor={borderColor} my={3}/>

                <VStack spacing={3} mt={4} align="stretch">
                  <MotionButton
                    bg={buttonPrimaryBg}
                    color={buttonPrimaryColor}
                    size="lg"
                    width="full"
                    fontWeight="bold"
                    leftIcon={<ExternalLinkIcon />}
                    onClick={() => {
                      // Tidak perlu cek selectedSize lagi
                      if (product.shopeeUrl) window.open(product.shopeeUrl, '_blank');
                    }}
                    isDisabled={!product.shopeeUrl}
                    _hover={{ bg: buttonPrimaryHoverBg, transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    boxShadow="md"
                    whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    Beli di Shopee
                  </MotionButton>
                  <MotionButton
                      variant="outline"
                      borderColor={borderColor}
                      color={textColor}
                      _hover={{bg: "whiteAlpha.100", borderColor: "whiteAlpha.300"}}
                      leftIcon={<ChatIcon />}
                      onClick={() => window.open('https://wa.me/NOMOR_WHATSAPP_ANDA', '_blank')}
                      width="full"
                      size="lg"
                      fontWeight="bold"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                  >
                      Tanya via WhatsApp
                  </MotionButton>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>

          {/* Section Produk Terkait */}
          {relatedProducts.length > 0 && (
            <MotionBox mt={{base: 16, md: 24}} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.2}}>
              <Heading size="lg" color={headingColor} mb={6} textAlign={{base: "center", md: "left"}}>
                Produk Lainnya yang Mungkin Kamu Suka
              </Heading>
              <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg:4 }} spacing={{ base: 3, md: 5 }}>
                {relatedProducts.map((relatedProd, index) => (
                  <MotionBox
                    key={relatedProd.id}
                    bg={cardBgColor}
                    borderRadius="lg"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor={borderColor}
                    variants={relatedCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={index}
                    whileHover="hover"
                    whileTap="tap"
                    display="flex"
                    flexDirection="column"
                    as={NextLink}
                    href={`/produk/${relatedProd.id}`}
                    _hover={{textDecoration: 'none'}}
                  >
                    <Box
                      w="full"
                      h={{ base: "150px", sm: "170px", md: "190px" }}
                      position="relative"
                      overflow="hidden"
                    >
                      <Image
                        src={relatedProd.imageUrl || '/images/distro/default-product.jpg'}
                        alt={`Foto ${relatedProd.name}`}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                        fallbackSrc='/images/distro/default-product.jpg'
                      />
                       {relatedProd.isNew && (
                           <Badge
                              position="absolute"
                              top={2}
                              left={2}
                              bg="white"
                              color="black"
                              fontSize="2xs"
                              px={1.5} py={0.5}
                              borderRadius="sm"
                              textTransform="uppercase"
                              fontWeight="bold"
                            >
                              Baru
                            </Badge>
                        )}
                    </Box>
                    <Box p={3} flexGrow={1} display="flex" flexDirection="column">
                      <Heading
                        as="h4"
                        fontSize={{base: "xs", sm:"sm"}}
                        fontWeight="semibold"
                        noOfLines={2}
                        color={headingColor}
                        minH={{base: "32px", sm:"36px"}}
                        mb={1.5}
                      >
                        {relatedProd.name}
                      </Heading>
                      <Text
                        fontSize={{base: "sm", sm:"md"}}
                        fontWeight="bold"
                        color={headingColor}
                        mt="auto"
                      >
                        {relatedProd.price}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </MotionBox>
          )}
        </MotionContainer>

        <Footer />
      </MotionBox>
    </AnimatePresence>
  );
}
