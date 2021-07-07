import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { API } from 'aws-amplify';
import { UserContext } from './userContext';
import graphql from '../graphql';

export const CompanyContext = React.createContext<{
    selectedCompany: SelectedCompany | undefined;
    setSelectedCompanyID: (companyID?: string) => void;
}>({
    selectedCompany: undefined,
    setSelectedCompanyID: async (companyID?: string) => {},
});

const CompanyProvider: React.FC = ({ children }) => {
    const [selectedCompany, setSelectedCompany] = React.useState<SelectedCompany | undefined>(
        undefined
    );

    const user = useContext(UserContext);
    useEffect(() => {
        setSelectedCompanyID(user?.companies.companies[0].companyID);
    }, [user]);

    const { Provider } = CompanyContext;

    const setSelectedCompanyID = async (companyID?: string) => {
        if (!companyID) return;
        const result = await API.graphql<{ getCompany: GetCompanyI }>({
            query: graphql.queries.getCompany,
            variables: {
                companyID,
            },
        });
        const companyRes = result.data?.getCompany || ({} as GetCompanyI);

        const {
            groups: { groups },
            ...allOtherFields
        } = companyRes;
        setSelectedCompany({ ...allOtherFields, groups: groups || [] });
    };

    return <Provider value={{ selectedCompany, setSelectedCompanyID }}>{children}</Provider>;
};

export default CompanyProvider;
