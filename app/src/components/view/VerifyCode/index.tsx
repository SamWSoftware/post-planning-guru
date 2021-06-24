import React, { useState } from 'react';
import { Button, VStack, Grid, useColorModeValue, Heading, Input } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';

interface Props {
    setSignupEmail: (email: string) => void;
    signupEmail?: string;
}

const VerifyCode: React.FC<Props> = ({ signupEmail, setSignupEmail }) => {
    const [email, setEmail] = useState(signupEmail || '');
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [codeExpired, setCodeExpired] = useState(false);

    const history = useHistory();

    const confirmCode = async () => {
        try {
            await Auth.confirmSignUp(email, code);
            setSignupEmail(email);
            history.push('/linkedin-confirmation/');
        } catch (error) {
            if (error.code === 'ExpiredCodeException') {
                setCodeExpired(true);
                setErrorMessage('This code has expired. Enter you email and get a new code');
                return;
            }
            if (error.code === 'NotAuthorizedException') {
                history.push('/linkedin-confirmation');
            }
            console.log('error confirming code', error);
            setErrorMessage(error.message);
        }
    };

    const resendCode = async () => {
        try {
            await Auth.resendSignUp(email);
            setCodeExpired(false);
            setErrorMessage('Check your email for a new code');
        } catch (error) {
            console.log('error resending code code', error);
            setErrorMessage(error.message);
        }
    };

    const borderColour = useColorModeValue('dark.900', 'white');
    const backgroundColour = useColorModeValue('white', 'dark.900');

    return (
        <Grid minH="100vh" p={5} bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Heading marginTop="20px">Verify Code</Heading>
            <VStack>
                <div>{errorMessage}</div>
                <Input
                    placeholder="Email Address"
                    bg={useColorModeValue('white', 'dark.700')}
                    border="2px"
                    borderColor={useColorModeValue('black', 'white')}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    placeholder="Verification Code"
                    bg={useColorModeValue('white', 'dark.700')}
                    border="2px"
                    borderColor={useColorModeValue('black', 'white')}
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    disabled={codeExpired}
                />
                <Button
                    border="2px"
                    borderColor={useColorModeValue('dark.900', 'white')}
                    bg={useColorModeValue('white', 'dark.900')}
                    width="100%"
                    onClick={confirmCode}
                    disabled={codeExpired}
                >
                    Next
                </Button>
                {codeExpired ? (
                    <Button
                        border="2px"
                        borderColor={borderColour}
                        bg={backgroundColour}
                        width="100%"
                        onClick={resendCode}
                    >
                        Get New Code
                    </Button>
                ) : null}
                <Button
                    bg={useColorModeValue('black', 'white')}
                    color={useColorModeValue('white', 'black')}
                    width="100%"
                >
                    <Link to="/">Cancel</Link>
                </Button>
            </VStack>
            <div></div>
        </Grid>
    );
};

export default VerifyCode;
