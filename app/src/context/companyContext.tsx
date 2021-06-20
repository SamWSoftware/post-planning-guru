import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { API } from 'aws-amplify';
import { UserContext } from './userContext';

export const CompanyContext = React.createContext<{
    selectedCompany: IUserCompany | undefined;
    setSelectedCompany: Dispatch<SetStateAction<IUserCompany | undefined>>;
}>({
    selectedCompany: undefined,
    setSelectedCompany: (): Dispatch<SetStateAction<IUserCompany | undefined>> => {
        return {} as Dispatch<SetStateAction<IUserCompany | undefined>>;
    },
});

const CompanyProvider: React.FC = ({ children }) => {
    const [selectedCompany, setSelectedCompany] =
        React.useState<IUserCompany | undefined>(undefined);

    const user = useContext(UserContext);
    useEffect(() => {
        console.log('useEffect in the company context', user);
        setSelectedCompany(user?.companies.companies[0]);
    }, [user]);

    const { Provider } = CompanyContext;

    return <Provider value={{ selectedCompany, setSelectedCompany }}>{children}</Provider>;
};

export default CompanyProvider;
