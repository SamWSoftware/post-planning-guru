import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Amplify, { Auth } from 'aws-amplify';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
} from 'react-router-dom';
import awsconfig from './aws-exports';

import theme from './theme';
import '@fontsource/comfortaa';

import Home from './components/view/Home';
import Posts from './components/view/Posts';
import SignIn from './components/view/SignIn';
import Nav from './components/organism/Nav';
import UserProvider from './context/userContext';
import Register from './components/view/Register';
import Account from './components/view/Account';
import VerifyCode from './components/view/VerifyCode';
import SignedInRouteGroup from './components/routingGroups/SignedInRouteGroup';

Amplify.configure(awsconfig);

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    const [signupEmail, setSignupEmail] = useState('');

    useEffect(() => {
        assessLoggedInState();
    }, []);

    const assessLoggedInState = () => {
        Auth.currentAuthenticatedUser()
            .then(sess => {
                console.log('logged in');
                setLoggedIn(true);
            })
            .catch(() => {
                console.log('not logged in');
                setLoggedIn(false);
            });
    };

    const signOut = async () => {
        try {
            await Auth.signOut();
            setLoggedIn(false);
            history.push('/');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Router>
                {!loggedIn ? (
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/signin">
                            <SignIn onSignIn={assessLoggedInState} />
                        </Route>
                        <Route exact path="/register">
                            <Register setSignupEmail={setSignupEmail} />
                        </Route>
                        <Route exact path="/verify">
                            <VerifyCode signupEmail={signupEmail} setSignupEmail={setSignupEmail} />
                        </Route>
                    </Switch>
                ) : (
                    <UserProvider>
                        <SignedInRouteGroup onSignOut={signOut} />
                    </UserProvider>
                )}
            </Router>
        </ChakraProvider>
    );
};
