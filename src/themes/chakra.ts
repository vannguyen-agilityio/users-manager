import { extendTheme } from '@chakra-ui/react';

// Common
import { fontSizes } from './commons/fontSizes';
import { fonts } from './commons/fonts';
import { colors } from './commons/colors';
import { lineHeights } from './commons/lineHeights';
import { space } from './commons/spacing';
import { radii } from './commons/borderRadius';
import { shadows } from './commons/shadows';

// Components
import { Text } from './components/text';
import { Badge } from './components/badge';
import { Button } from './components/button';
import { Modal } from './components/modal';
import { Input } from './components/input';
import { Form } from './components/form';
import { Select } from './components/select';
import { Menu } from './components/menu';
import { NumberInput } from './components/numberinput';

const overrides = {
  components: {
    Text,
    Badge,
    Button,
    Modal,
    Input,
    Form,
    Select,
    NumberInput,
    Menu
  },
  fontSizes,
  fonts,
  colors,
  space,
  radii,
  shadows,
  lineHeights
};

export const CHAKRA_THEME = extendTheme(overrides);
