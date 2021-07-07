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
    Box,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';
import HomeIcon from '../../atom/HomeIcon';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';

interface Props {}

const Nav: React.FC<Props> = () => {
    const user = useContext(UserContext);
    const consoleUser = () => {
        console.log('user from context', user);
    };

    return (
        <Container
            position="fixed"
            bottom="0"
            bg={useColorModeValue('white', 'dark.900')}
            padding="0 0 10px 0"
            maxWidth="100vw"
        >
            <Box bg="grey" width="100vw" height="2px" marginBottom="10px"></Box>
            <HStack justifyContent="space-evenly">
                <Link to="/">
                    <IconButton aria-label="Search database" icon={<HomeIcon />}></IconButton>
                </Link>
                <Link to="/groups">
                    <IconButton aria-label="Search database" icon={<HomeIcon />}></IconButton>
                </Link>
                <Link to="/add-post">
                    <Button>+</Button>
                </Link>
                <Link to="/published-posts">
                    <IconButton aria-label="Published Posts" icon={<HomeIcon />}></IconButton>
                </Link>
                <Link to="/account">
                    <IconButton aria-label="My Account" icon={<HomeIcon />}></IconButton>
                </Link>
            </HStack>
        </Container>
    );
};

export default Nav;
