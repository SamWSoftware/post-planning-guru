import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import awsconfig from './aws-exports';

import theme from './theme';
import '@fontsource/comfortaa';

import Home from './components/view/Home';
import Posts from './components/view/Posts';
import SignIn from './components/view/SignIn';
import Nav from './components/organism/Nav';
import UserProvider from './context/userContext';

Amplify.configure(awsconfig);

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

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
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Switch>
                    {!loggedIn ? (
                        <>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/signin">
                                <SignIn onSignIn={assessLoggedInState} />
                            </Route>
                        </>
                    ) : (
                        <UserProvider>
                            <Route exact path="/">
                                <Redirect to="/posts" />
                            </Route>
                            <Route exact path="/posts">
                                <Posts />
                            </Route>
                            <Nav />
                        </UserProvider>
                    )}
                </Switch>
            </Router>
        </ChakraProvider>
    );
};
