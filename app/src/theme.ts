import { theme } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const primaryLightColor = 'pink';
const primaryDarkColor = 'blue';

export default extendTheme({
    colors: {
        light: theme.colors[primaryLightColor],
        dark: theme.colors[primaryDarkColor],
    },
    fonts: {
        heading: 'comfortaa',
    },
});
