import React from 'react';
import {
    Button,
    ButtonGroup,
    VStack,
    Grid,
    Text,
    Center,
    useColorModeValue,
    Heading,
    Container,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';
import { useState } from 'react';
import { API } from 'aws-amplify';
import graphql from '../../../graphql';

interface Props {
    companyID: string;
}

const LinkedInCode: React.FC<Props> = ({ companyID }) => {
    const [fastSkip, setFastSkip] = useState(false);
    const [saved, setSaved] = useState(false);
    const qsParams = new URLSearchParams(window.location.search);
    const linkedInCode = qsParams.get('code');

    const saveCode = async () => {
        try {
            await API.graphql({
                query: graphql.mutations.setCompanyLinkedInCode,
                variables: {
                    linkedInCode,
                    companyID,
                },
            });

            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.warn('error updating the LI code', error);
        }
    };
    saveCode();

    return (
        <Grid minH="100vh" bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Container
                paddingTop="30px"
                marginBottom="10px"
                height="140px"
                background={useColorModeValue('white', 'dark.900')}
            >
                <Heading marginTop="20px">Syncing LinkedIn</Heading>
            </Container>
            <VStack p={5}>
                {saved ? (
                    <Text>
                        Thanks, that has worked perfectly. You'll shortly be sent to the home page.
                    </Text>
                ) : (
                    <Text>
                        We're just saving your details and they we'll send you to the home page
                    </Text>
                )}
                <Button
                    bg={useColorModeValue('black', 'white')}
                    color={useColorModeValue('white', 'black')}
                    width="100%"
                    disabled={!fastSkip}
                >
                    Go to Home Page
                </Button>
            </VStack>
        </Grid>
    );
};

export default LinkedInCode;
