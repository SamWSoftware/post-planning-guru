import React from 'react';
import {
    Button,
    ButtonGroup,
    VStack,
    Grid,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Container,
    Input,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';
import { useState } from 'react';
import { API } from 'aws-amplify';
import { createCompany } from '../../../graphql/mutations';
import graphql from '../../../graphql';

interface Props {
    isFirstCompany?: boolean;
}

const isFirstCompanyExplaination = {
    first: `To post to LinkedIn, you need to give us access. This starts by providing a name for the profile.
    After that, you need to confirm on LinkedIn that Post Planning Guru can post for you.`,
    another: `To add another profile, give it a new name. 
    You'll then have to log in to LinkedIn with that account and confirm that you are allowing Post Planning Guru post for you `,
};

const linkedInSignupUrl = {
    localhost:
        'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77tpkzydxa0jqg&redirect_uri=http://localhost:3000/auth/linkedin/callback&state=completecodingsaasproduct&scope=r_liteprofile,w_member_social',
    dev: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77tpkzydxa0jqg&redirect_uri=https://dev.example.com/auth/linkedin/callback&state=completecodingsaasproduct&scope=r_liteprofile,w_member_social',
    int: '',
    prod: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77tpkzydxa0jqg&redirect_uri=https://dev.example.com/auth/linkedin/callback&state=completecodingsaasproduct&scope=r_liteprofile,w_member_social',
};

const CreateCompany: React.FC<Props> = ({ isFirstCompany }) => {
    const [profile, setProfile] = useState('');

    const createCompany = async () => {
        try {
            const res = await API.graphql({
                query: graphql.mutations.createCompany,
                variables: {
                    companyName: profile,
                },
            });
            console.log('result from create company', res.data);
            window.location.href = linkedInSignupUrl.localhost;
        } catch (error) {
            console.error('error creating company', error);
        }
    };

    return (
        <Grid minH="100vh" bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Container
                paddingTop="30px"
                marginBottom="10px"
                height="90px"
                background={useColorModeValue('white', 'dark.900')}
            >
                <Heading marginTop="20px">Connect To LinkedIn</Heading>
            </Container>
            <VStack p={5}>
                <Text paddingBottom="20px">
                    {isFirstCompanyExplaination[isFirstCompany ? 'first' : 'another']}
                </Text>
                <Input
                    placeholder="Profile Name"
                    bg={useColorModeValue('white', 'dark.700')}
                    border="2px"
                    borderColor={useColorModeValue('black', 'white')}
                    onChange={e => setProfile(e.target.value)}
                    value={profile}
                />
                <Button
                    bg={useColorModeValue('black', 'white')}
                    color={useColorModeValue('white', 'black')}
                    width="100%"
                    onClick={createCompany}
                >
                    Connect To LinkedIn
                </Button>
            </VStack>
            <div />
        </Grid>
    );
};

export default CreateCompany;
