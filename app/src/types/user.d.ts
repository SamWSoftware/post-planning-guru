interface IUser {
    userID: string;
    name: string;
    email: string;
    companies: CompaniesPage;
}

interface CompaniesPage {
    companies: IUserCompany[];
}

interface IUserCompany {
    companyID: string;
    companyName: string;
    companyLogoURL: string;
    linkedInCode?: string;
}
