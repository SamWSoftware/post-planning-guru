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

import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';

interface Props {
    onSignOut: () => void;
}

const Account: React.FC<Props> = ({ onSignOut }) => {
    const user = useContext(UserContext);
    return (
        <Grid minH="100vh" bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Heading>{user?.name}</Heading>
            <VStack>
                <Button onClick={onSignOut}> Sign Out</Button>
            </VStack>
        </Grid>
    );
};

export default Account;
