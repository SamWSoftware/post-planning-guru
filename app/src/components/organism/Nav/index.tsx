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
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import HomeIcon from '../../atom/HomeIcon';

interface Props {}

const Nav: React.FC<Props> = () => {
    return (
        <Container>
            <HStack justifyContent="space-evenly">
                <IconButton aria-label="Search database" icon={<HomeIcon />}></IconButton>
                <IconButton aria-label="Search database" icon={<HomeIcon />}></IconButton>
                <Button>+</Button>
                <IconButton aria-label="Search database" icon={<HomeIcon />}></IconButton>
                <IconButton aria-label="Search database" icon={<HomeIcon />}></IconButton>
            </HStack>
        </Container>
    );
};

export default Nav;
