import React, { useEffect, useState } from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Signin from './components/Signin';
import { Button } from '@chakra-ui/react';

Amplify.configure(awsconfig);

const App = () => {
    useEffect(() => {
        assessLogedInState();
    }, []);

    const assessLogedInState = () => {
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

    const [loggedIn, setLoggedIn] = useState(true);

    const signOut = async () => {
        try {
            await Auth.signOut();
            setLoggedIn(false);
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    {loggedIn ? (
                        <Button onClick={signOut} colorScheme="blue">
                            Log Out
                        </Button>
                    ) : (
                        <Link to="/sign-in">
                            <Button colorScheme="blue">Log In</Button>
                        </Link>
                    )}
                    <h2>My App Content</h2>
                    <div></div>
                </header>

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/sign-in">
                        <Signin onSignin={assessLogedInState} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App; //withAuthenticator(App);
