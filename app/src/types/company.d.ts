interface GetCompanyI {
    companyID: string;
    companyName: string;
    companyLogoURL: string;
    linkedInCode?: string;
    accessToken: string;
    accessTokenExpiry: string;

    groups: {
        groups: IGroup[];
    };

    ownerID: string;
    owner: {
        userID: string;
        name: string;
        email: string;
    };
}

interface SelectedCompany {
    companyID: string;
    companyName: string;
    companyLogoURL: string;
    linkedInCode?: string;
    accessToken: string;
    accessTokenExpiry: string;

    groups: IGroup[];

    ownerID: string;
    owner: {
        userID: string;
        name: string;
        email: string;
    };
}
