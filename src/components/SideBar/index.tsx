import { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps
} from '@chakra-ui/react';
import {
  FiMenu,
  FiBell,
  FiUser,
  FiMail,
  FiLogOut,
  FiSettings,
  FiDollarSign,
  FiMessageCircle
} from 'react-icons/fi';
import {
  FaUserAlt,
  FaSistrix,
  FaGenderless,
  FaRegFileAlt
} from 'react-icons/fa';

// Constants
import { ROUTES } from '../../constants/routes';

// Components
import { Menu } from '../Menu';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface SidebarMobileProps extends FlexProps {
  onOpen: () => void;
}

const itemsUserMenu = {
  label: 'User',
  items: [
    {
      key: 'user',
      links: [
        { name: 'List', icon: FaGenderless, href: ROUTES.USERS },
        { name: 'View', icon: FaGenderless, href: ROUTES.USER_DETAIL.URL }
      ]
    }
  ]
};

const itemsInvoiceMenu = {
  label: 'Invoice',
  items: [
    {
      key: 'invoice',
      links: [
        { name: 'List', icon: FaGenderless, href: '#' },
        { name: 'Preview', icon: FaGenderless, href: '#' },
        { name: 'Edit', icon: FaGenderless, href: '#' }
      ]
    }
  ]
};

const itemsMenuHeader = {
  label: '',
  items: [
    {
      key: 'menu1',
      links: [
        { name: 'Profile', icon: FiUser, href: '#' },
        { name: 'Inbox', icon: FiMail, href: '#' },
        { name: 'Chat', icon: FiMessageCircle, href: '#' }
      ]
    },
    {
      key: 'menu2',
      links: [
        { name: 'Setting', icon: FiSettings, href: '#' },
        { name: 'Pricing', icon: FiDollarSign, href: '#' }
      ]
    },
    {
      key: 'menu3',
      links: [{ name: 'Sign out', icon: FiLogOut, href: '#' }]
    }
  ]
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    transition="3s ease"
    bgColor="secondary.200"
    borderRight="1px"
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Text fontSize="2xl" fontWeight="bold">
        Logo
      </Text>
      <CloseButton
        color="default.light"
        display={{ base: 'flex', md: 'none' }}
        onClick={onClose}
      />
    </Flex>
    <Menu
      type="sidebar"
      variant="sidebar"
      itemsMenu={itemsUserMenu}
      className="sidebar sidebar-users"
    >
      <FaUserAlt />
    </Menu>
    <Menu
      type="sidebar"
      variant="sidebar"
      itemsMenu={itemsInvoiceMenu}
      className="sidebar"
    >
      <FaRegFileAlt />
    </Menu>
  </Box>
);

const MobileNav = ({ onOpen, ...rest }: SidebarMobileProps) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue('default.light', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
    {...rest}
  >
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      variant="outline"
      aria-label="open menu"
      icon={<FiMenu />}
    />
    <Text
      display={{ base: 'flex', md: 'none' }}
      fontSize="2xl"
      fontWeight="bold"
    >
      Logo
    </Text>
    <Flex justifyContent="space-between" w="100%">
      <Flex alignItems="center" cursor="pointer">
        <IconButton
          aria-label="SearchIcon"
          icon={<FaSistrix />}
          colorScheme="blackAlpha"
          variant="ghost"
        />
        <Text
          color="default.placeholder"
          display={{ base: 'none', md: 'flex' }}
        >
          Search (Ctrl + /)
        </Text>
      </Flex>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="center">
          <Menu
            size="sm"
            type="base"
            userActive={{
              name: 'John Doe',
              role: 'Admin'
            }}
            itemsMenu={itemsMenuHeader}
          >
            <></>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  </Flex>
);

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
