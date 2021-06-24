import React from 'react';
import {
    Button,
    ButtonGroup,
    VStack,
    Grid,
    Center,
    Text,
    useColorModeValue,
    Heading,
    Container,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';

interface Props {}

const LinkedInConfirmation: React.FC<Props> = () => {
    return (
        <Grid minH="100vh" bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Container
                paddingTop="30px"
                marginBottom="10px"
                height="140px"
                background={useColorModeValue('white', 'dark.900')}
            >
                <Heading marginTop="20px">Complete LinkedIn Setup</Heading>
            </Container>
            <VStack p={5}>
                <Text>
                    The profile you've selected hasn't completed the LinkedIn signup yet. Click the
                    link below and you confirm that Post Planning Guru can create posts for this
                    profile.
                </Text>
            </VStack>
        </Grid>
    );
};

export default LinkedInConfirmation;
