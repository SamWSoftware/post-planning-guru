import React from 'react';
import { useContext } from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';
import { CompanyContext } from '../../context/companyContext';
import Nav from '../organism/Nav';
import Account from '../view/Account';
import CreateCompany from '../view/CreateCompany';
import LinkedInCode from '../view/LinkedInCode';
import LinkedInConfirmation from '../view/LinkedInConfirmation';
import Posts from '../view/Posts';

interface Props {
    onSignOut: () => void;
}

const SignedInRouteGroup: React.FC<Props> = ({ onSignOut }) => {
    const { selectedCompany } = useContext(CompanyContext);

    if (!selectedCompany) {
        // need to create a 'company' to post for
        return <CreateCompany isFirstCompany />;
    }

    if (!selectedCompany?.linkedInCode) {
        console.log(window.location.href);
        return (
            <Switch>
                <Route exact path="/auth/linkedin/callback">
                    <LinkedInCode companyID={selectedCompany.companyID} />
                </Route>
                <Route exact path="/linkedin-confirmation">
                    <LinkedInConfirmation />
                </Route>
                <Route path="/">
                    <LinkedInConfirmation />
                </Route>
            </Switch>
        );
    }

    return (
        <>
            <Switch>
                <Route exact path="/posts">
                    <Posts />
                </Route>
                <Route exact path="/account">
                    <Account onSignOut={onSignOut} />
                </Route>
                <Route path="/">
                    <Redirect to="/posts" />
                </Route>
            </Switch>
            <Nav />
        </>
    );
};

export default SignedInRouteGroup;
