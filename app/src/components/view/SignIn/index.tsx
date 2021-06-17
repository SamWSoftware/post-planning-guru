import React, { useState } from 'react';
import {
    Button,
    VStack,
    Grid,
    Center,
    useColorModeValue,
    Heading,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';
import { Input } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

interface Props {
    onSignIn: () => void;
}

const SignIn: React.FC<Props> = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState(' ');

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const singInFunction = async () => {
        try {
            const user = await Auth.signIn(email, password);
            history.push('/');
            onSignIn();
        } catch (error) {
            console.log('error signing in', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <Grid minH="100vh" p={5} bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Heading marginTop="20px">Log In</Heading>
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
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                        bg={useColorModeValue('white', 'dark.700')}
                        border="2px"
                        borderColor={useColorModeValue('black', 'white')}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button
                    bg={useColorModeValue('black', 'white')}
                    color={useColorModeValue('white', 'black')}
                    width="100%"
                    onClick={singInFunction}
                >
                    Next
                </Button>
                <Button
                    color={useColorModeValue('black', 'white')}
                    bg={useColorModeValue('white', 'black')}
                    width="100%"
                >
                    <Link to="/register">I need to Register</Link>
                </Button>
            </VStack>
            <div></div>
        </Grid>
    );
};

export default SignIn;
