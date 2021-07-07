/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
    mutation CreateCompany($companyName: String!, $companyLogoURL: String) {
        createCompany(companyName: $companyName, companyLogoURL: $companyLogoURL) {
            companyID
            companyName
            companyLogoURL
        }
    }
`;
export const setCompanyLinkedInCode = /* GraphQL */ `
    mutation SetCompanyLinkedInCode($companyID: ID!, $linkedInCode: String!) {
        setCompanyLinkedInCode(companyID: $companyID, linkedInCode: $linkedInCode) {
            companyID
            linkedInCode
            accessToken
            accessTokenExpiry
        }
    }
`;
export const createPost = /* GraphQL */ `
    mutation CreatePost(
        $companyID: ID!
        $contentText: String!
        $title: String
        $groupID: ID
        $publishTime: Long
    ) {
        createPost(
            companyID: $companyID
            contentText: $contentText
            title: $title
            groupID: $groupID
            publishTime: $publishTime
        ) {
            postID
            companyID
            groupID
            date
            isDraft
            content {
                text
            }
            TTL
        }
    }
`;
export interface CreatePost {
    companyID: string;
    contentText: string;
    title?: string;
    groupID?: string;
    publishTime?: number;
    isDraft?: boolean;
}

export const updatePost = /* GraphQL */ `
    mutation UpdatePost(
        $postID: ID!
        $contentText: String
        $newGroupID: ID
        $publishTime: Long
        $draft: Boolean
    ) {
        updatePost(
            postID: $postID
            contentText: $contentText
            newGroupID: $newGroupID
            publishTime: $publishTime
            draft: $draft
        ) {
            postID
            companyID
            groupID
            date
            isDraft
            content {
                text
            }
            TTL
        }
    }
`;

export interface UpdatePostI {
    postID: string;
    contentText?: string;
    newGroupID?: string;
    publishTime?: number;
    title?: string;
    draft?: Boolean;
}
export const deletePost = /* GraphQL */ `
    mutation DeletePost($postID: ID!) {
        deletePost(postID: $postID)
    }
`;
export const createGroup = /* GraphQL */ `
    mutation CreateGroup(
        $companyID: ID!
        $groupName: String!
        $colour: String!
        $description: String
    ) {
        createGroup(
            companyID: $companyID
            groupName: $groupName
            colour: $colour
            description: $description
        ) {
            companyID
            groupID
            groupName
            description
            colour
            company {
                companyID
                ownerID
                companyName
                companyLogoURL
                linkedInCode
                accessToken
                accessTokenExpiry
            }
            schedules {
                nextToken
            }
            posts {
                nextToken
            }
            publishedPosts {
                nextToken
            }
        }
    }
`;
export const updateGroup = /* GraphQL */ `
    mutation UpdateGroup(
        $companyID: ID!
        $groupID: ID!
        $groupName: String
        $colour: String
        $description: String
    ) {
        updateGroup(
            companyID: $companyID
            groupID: $groupID
            groupName: $groupName
            colour: $colour
            description: $description
        ) {
            companyID
            groupID
            groupName
            description
            colour
            company {
                companyID
                ownerID
                companyName
                companyLogoURL
                linkedInCode
                accessToken
                accessTokenExpiry
            }
            schedules {
                nextToken
            }
            posts {
                nextToken
            }
            publishedPosts {
                nextToken
            }
        }
    }
`;
export const createSchedule = /* GraphQL */ `
    mutation CreateSchedule(
        $companyID: ID!
        $groupID: ID!
        $cronSchedule: String!
        $name: String
        $description: String
    ) {
        createSchedule(
            companyID: $companyID
            groupID: $groupID
            cronSchedule: $cronSchedule
            name: $name
            description: $description
        ) {
            companyID
            scheduleID
            groupID
            group {
                companyID
                groupID
                groupName
                description
                colour
            }
            TTL
            cronSchedule
            name
            description
        }
    }
`;
export const updateSchedule = /* GraphQL */ `
    mutation UpdateSchedule(
        $companyID: ID!
        $scheduleID: ID!
        $groupID: ID
        $cronSchedule: String
        $name: String
        $description: String
    ) {
        updateSchedule(
            companyID: $companyID
            scheduleID: $scheduleID
            groupID: $groupID
            cronSchedule: $cronSchedule
            name: $name
            description: $description
        ) {
            companyID
            scheduleID
            groupID
            group {
                companyID
                groupID
                groupName
                description
                colour
            }
            TTL
            cronSchedule
            name
            description
        }
    }
`;
export const deleteSchedule = /* GraphQL */ `
    mutation DeleteSchedule($companyID: ID!, $scheduleID: ID!) {
        deleteSchedule(companyID: $companyID, scheduleID: $scheduleID)
    }
`;
