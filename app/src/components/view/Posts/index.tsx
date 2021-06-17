import React from 'react';
import {
    Button,
    ButtonGroup,
    VStack,
    Grid,
    Center,
    useColorModeValue,
    Heading,
    Container,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';

interface Props {}

const Posts: React.FC<Props> = () => {
    return (
        <Grid minH="100vh" bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Container
                paddingTop="30px"
                height="90px"
                background={useColorModeValue('white', 'dark.900')}
            >
                <Heading marginTop="20px">Posts</Heading>
            </Container>
            <VStack></VStack>
        </Grid>
    );
};

export default Posts;
