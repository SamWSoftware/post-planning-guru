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
    setSignupEmail: (email: string) => void;
}

const Register: React.FC<Props> = ({ setSignupEmail }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState(' ');

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const registerFunction = async () => {
        try {
            const { user } = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    name,
                },
            });
            setSignupEmail(email);
            history.push('/verify');
        } catch (error) {
            console.log('error registering', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <Grid minH="100vh" p={5} bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Heading marginTop="20px">Register</Heading>
            <VStack>
                <div>{errorMessage}</div>
                <Input
                    placeholder="Full Name"
                    bg={useColorModeValue('white', 'dark.700')}
                    border="2px"
                    borderColor={useColorModeValue('black', 'white')}
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
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
                    border="2px"
                    borderColor={useColorModeValue('dark.900', 'white')}
                    bg={useColorModeValue('white', 'dark.900')}
                    width="100%"
                    onClick={registerFunction}
                >
                    Next
                </Button>
                <Button
                    bg={useColorModeValue('black', 'white')}
                    color={useColorModeValue('white', 'black')}
                    width="100%"
                >
                    <Link to="/verify">I have a Verification Code</Link>
                </Button>
                <Button
                    bg={useColorModeValue('black', 'white')}
                    color={useColorModeValue('white', 'black')}
                    width="100%"
                >
                    <Link to="/">Home</Link>
                </Button>
            </VStack>
            <div></div>
        </Grid>
    );
};

export default Register;
