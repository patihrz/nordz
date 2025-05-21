// src/components/Navbar.js
'use client';

import {
  Box,
  Container,
  // Heading, // Tidak digunakan lagi untuk brandName
  Text,
  Button,
  useColorModeValue,
  HStack,
  Link as ChakraLink,
  Spacer,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image'; // Import NextImage untuk logo

// Buat motion component dari Chakra components
const MotionBox = motion(Box);
const MotionChakraLink = motion(ChakraLink);
const MotionButton = motion(Button);
const MotionMenuButton = motion(MenuButton);

// Link navigasi utama
const MainNavLinks = [
  { label: 'SEMUA PRODUK', href: '/semua-produk' },
  { label: 'TERBARU', href: '#' },
];

// Kategori produk distro
const categories = [
  { label: 'KAOS', href: '/kategori/kaos' },
  { label: 'HOODIE', href: '/kategori/hoodie' },
  { label: 'JAKET', href: '/kategori/jaket' },
  { label: 'CELANA', href: '/kategori/celana' },
  { label: 'AKSESORIS', href: '/kategori/aksesoris' },
];

export default function Navbar({
  logoAltText = "Nordz Apparel Logo", // Default alt text untuk logo
}) {
  const navBgColor = useColorModeValue('gray.50', 'black');
  const navTextColor = useColorModeValue('black', 'whiteAlpha.900');
  const linkHoverColor = useColorModeValue('gray.600', 'gray.400');
  const buttonColorScheme = useColorModeValue('gray', 'gray');
  const buttonHoverBg = useColorModeValue('gray.100', 'gray.700');
  const menuListBg = useColorModeValue('white', 'gray.800');
  const menuListBorderColor = useColorModeValue('gray.200', 'gray.700');

  const { isOpen: isMobileDrawerOpen, onOpen: onMobileDrawerOpen, onClose: onMobileDrawerClose } = useDisclosure();
  const { isOpen: isCategoryDrawerOpen, onToggle: onCategoryDrawerToggle } = useDisclosure();

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinkStyle = {
    fontSize: "sm",
    fontWeight: "bold",
    textTransform: "uppercase",
    _hover: {
      textDecoration: 'none',
      color: linkHoverColor,
    },
  };

  const menuItemStyle = {
    bg: menuListBg,
    color: navTextColor,
    _hover: { bg: buttonHoverBg, color: linkHoverColor },
    fontSize: "sm",
    textTransform: "uppercase",
    fontWeight: "bold",
  };

  return (
    <MotionBox
      as="nav"
      bg={navBgColor}
      color={navTextColor}
      boxShadow={useColorModeValue('sm', 'md')}
      py={3} // Padding vertikal bisa disesuaikan jika logo terlalu besar/kecil
      position="sticky"
      top={0}
      zIndex={1100}
      borderBottomWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <Container
        maxW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <MotionChakraLink
          as={NextLink}
          href="/"
          _hover={{ textDecoration: 'none' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          display="flex" // Untuk alignment vertikal logo jika perlu
          alignItems="center"
        >
          {/* Menggunakan NextImage untuk Logo */}
          <NextImage
            src="/icons/nordz-logo.png" // Path ke logo di folder public
            alt={logoAltText}
            width={100} // Sesuaikan lebar logo
            height={30} // Sesuaikan tinggi logo
            // priority // Jika logo adalah LCP (Largest Contentful Paint)
            style={{ filter: navBgColor === 'black' ? 'invert(1) grayscale(1) brightness(2)' : 'none' }} // Agar logo putih di background hitam
          />
        </MotionChakraLink>

        <Spacer display={{ base: 'none', md: 'block' }} />

        <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
          {MainNavLinks.map((link) => (
            <MotionChakraLink
              key={link.label}
              as={NextLink}
              href={link.href}
              {...navLinkStyle}
              whileHover={{ scale: 1.1, color: linkHoverColor }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {link.label}
            </MotionChakraLink>
          ))}

          <Menu placement="bottom-start" gutter={4} >
            {({ isOpen }) => (
              <>
                <MotionMenuButton
                  as={Button}
                  variant="ghost"
                  size="sm"
                  color={navTextColor}
                  rightIcon={<ChevronDownIcon transform={isOpen ? 'rotate(180deg)' : ''} transition="transform 0.2s"/>}
                  _active={{ bg: buttonHoverBg }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  {...navLinkStyle}
                  _hover={{ bg: buttonHoverBg, color: linkHoverColor }}
                >
                  KATEGORI
                </MotionMenuButton>
                <MenuList
                  bg={menuListBg}
                  borderColor={menuListBorderColor}
                  boxShadow="lg"
                  zIndex={1200}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category.label}
                      as={NextLink}
                      href={category.href}
                      {...menuItemStyle}
                    >
                      {category.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>

          <MotionButton
            colorScheme={buttonColorScheme}
            variant="outline"
            size="sm"
            borderColor={navTextColor}
            fontWeight="bold"
            textTransform="uppercase"
            _hover={{
              bg: buttonHoverBg,
            }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            KONTAK
          </MotionButton>
        </HStack>

        <IconButton
          aria-label="Buka menu"
          icon={<HamburgerIcon boxSize={6} />}
          variant="ghost"
          onClick={onMobileDrawerOpen}
          display={{ base: 'flex', md: 'none' }}
          _hover={{ bg: buttonHoverBg }}
        />
      </Container>

      <Drawer placement="right" onClose={onMobileDrawerClose} isOpen={isMobileDrawerOpen} size="full">
        <DrawerOverlay />
        <DrawerContent bg={navBgColor} color={navTextColor}>
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontWeight="bold" textTransform="uppercase">Menu</Text>
            <IconButton
              aria-label="Tutup menu"
              icon={<CloseIcon boxSize={4} />}
              variant="ghost"
              onClick={onMobileDrawerClose}
              _hover={{ bg: buttonHoverBg }}
            />
          </DrawerHeader>
          <DrawerBody>
            <VStack as={motion.div} spacing={6} align="stretch" mt={8} variants={{ visible: { transition: { staggerChildren: 0.1 }}}} initial="hidden" animate="visible">
              {MainNavLinks.map((link) => (
                <MotionChakraLink
                  key={link.label}
                  as={NextLink}
                  href={link.href}
                  fontSize="lg"
                  fontWeight="bold"
                  textTransform="uppercase"
                  onClick={onMobileDrawerClose}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                  variants={linkItemVariants}
                  whileHover={{ x: 5, color: linkHoverColor }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </MotionChakraLink>
              ))}

              <Box w="full">
                <Button
                  variant="ghost"
                  w="full"
                  justifyContent="space-between"
                  fontSize="lg"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color={navTextColor}
                  onClick={onCategoryDrawerToggle}
                  rightIcon={isCategoryDrawerOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                  _hover={{ bg: buttonHoverBg, color: linkHoverColor }}
                  py={2}
                  height="auto"
                >
                  Kategori
                </Button>
                <Collapse in={isCategoryDrawerOpen} animateOpacity>
                  <VStack pl={4} mt={2} align="stretch" spacing={3}>
                    {categories.map((category) => (
                      <MotionChakraLink
                        key={category.label}
                        as={NextLink}
                        href={category.href}
                        fontSize="md"
                        fontWeight="bold"
                        textTransform="uppercase"
                        onClick={onMobileDrawerClose}
                        _hover={{
                          textDecoration: 'none',
                          color: linkHoverColor,
                        }}
                        variants={linkItemVariants}
                        whileHover={{ x: 5, color: linkHoverColor }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category.label}
                      </MotionChakraLink>
                    ))}
                  </VStack>
                </Collapse>
              </Box>

              <MotionButton
                colorScheme={buttonColorScheme}
                variant="solid"
                bg={useColorModeValue('gray.200', 'gray.700')}
                color={navTextColor}
                w="full"
                mt={4}
                onClick={onMobileDrawerClose}
                variants={linkItemVariants}
                fontWeight="bold"
                textTransform="uppercase"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Kontak
              </MotionButton>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
}
