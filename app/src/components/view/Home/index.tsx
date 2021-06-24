import React from 'react';
import {
    Button,
    ButtonGroup,
    VStack,
    Grid,
    Center,
    useColorModeValue,
    Heading,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';
import { Link } from 'react-router-dom';

interface Props {}

const Home: React.FC<Props> = () => {
    return (
        <Grid minH="100vh" p={0} bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <div></div>
            <VStack spacing={8} paddingBottom="200px">
                <Heading>Post Planning Guru</Heading>
            </VStack>
            <Center
                h="90px"
                bottom="0"
                width="100vw"
                position="absolute"
                bg={useColorModeValue('white', 'dark.900')}
            >
                <ButtonGroup width="100%" justifyContent="center">
                    <Button
                        border="2px"
                        borderColor={useColorModeValue('dark.900', 'white')}
                        bg={useColorModeValue('white', 'dark.900')}
                    >
                        <Link to="signin" href="/signin">
                            LOG IN
                        </Link>
                    </Button>
                    <Button
                        bg={useColorModeValue('black', 'white')}
                        color={useColorModeValue('white', 'black')}
                    >
                        <Link to="register">REGISTER</Link>
                    </Button>
                </ButtonGroup>
            </Center>
        </Grid>
    );
};

export default Home;
