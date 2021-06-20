interface IPost {
    postID: string;
    companyID: string;
    groupID: string;
    group: {
        groupID: string;
        groupName: string;
        description?: string;
        colour: string;
    };
    title: string;
    date: number;
    content: {
        text: string;
    };
    isDraft?: boolean;
    TTL?: number;
}
