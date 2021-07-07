import React, { useEffect } from 'react';
import { API } from 'aws-amplify';
import { getMyUser } from '../graphql/queries';
import CompanyProvider, { CompanyContext } from './companyContext';
import { useContext } from 'react';

export const UserContext = React.createContext<IUser | null>(null);

const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<IUser | null>(null);

    useEffect(() => {
        // get the current user
        API.graphql<{ getMyUser: IUser }>({
            query: getMyUser,
        })
            .then(res => {
                const user = res.data!.getMyUser;
                setUser(user || null);
            })
            .catch(error => {
                console.error('error getting my user', error);
            });
    }, []);

    const { Provider } = UserContext;

    return (
        <Provider value={user}>
            <CompanyProvider>{children}</CompanyProvider>
        </Provider>
    );
};

export default UserProvider;
