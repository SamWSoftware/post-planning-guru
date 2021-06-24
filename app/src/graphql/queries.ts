/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMyUser = /* GraphQL */ `
    query GetMyUser {
        getMyUser {
            userID
            name
            email
            companies {
                companies {
                    companyID
                    companyName
                    companyLogoURL
                    linkedInCode
                }
            }
        }
    }
`;

export const getCompany = /* GraphQL */ `
    query GetCompany($companyID: String!) {
        getCompany(companyID: $companyID) {
            companyID
            ownerID
            owner {
                userID
                name
                email
            }
            companyName
            companyLogoURL
            linkedInCode
            accessToken
            accessTokenExpiry
        }
    }
`;
export const getCompanies = /* GraphQL */ `
    query GetCompanies($userID: String!, $limit: Int, $nextToken: String) {
        getCompanies(userID: $userID, limit: $limit, nextToken: $nextToken) {
            companies {
                companyID
                ownerID
                companyName
                companyLogoURL
                linkedInCode
                accessToken
                accessTokenExpiry
            }
            nextToken
        }
    }
`;
export const getPost = /* GraphQL */ `
    query GetPost($postID: ID!) {
        getPost(postID: $postID) {
            postID
            companyID
            groupID
            group {
                groupID
                groupName
                description
                colour
            }
            date
            isDraft
            content {
                text
            }
            TTL
        }
    }
`;
export const getPostsForCompany = /* GraphQL */ `
    query GetPostsForCompany($companyID: String!, $limit: Int, $nextToken: String) {
        getPostsForCompany(companyID: $companyID, limit: $limit, nextToken: $nextToken) {
            posts {
                postID
                companyID
                groupID
                group {
                    groupID
                    groupName
                    description
                    colour
                }
                date
                title
                content {
                    text
                }
                isDraft
                TTL
            }
            nextToken
        }
    }
`;
export const getPostsForGroup = /* GraphQL */ `
    query GetPostsForGroup(
        $companyID: String!
        $groupID: String!
        $limit: Int
        $nextToken: String
    ) {
        getPostsForGroup(
            companyID: $companyID
            groupID: $groupID
            limit: $limit
            nextToken: $nextToken
        ) {
            posts {
                postID
                companyID
                groupID
                group {
                    groupID
                    groupName
                    description
                    colour
                }
                date
                content {
                    text
                }
                isDraft
            }
            nextToken
        }
    }
`;
export const getPublishedPost = /* GraphQL */ `
    query GetPublishedPost($postID: ID!) {
        getPublishedPost(postID: $postID) {
            postID
            companyID
            date
            groupID
            group {
                groupID
                groupName
                description
                colour
            }
            content {
                text
            }
        }
    }
`;
export const getPublishedPostsForCompany = /* GraphQL */ `
    query GetPublishedPostsForCompany($companyID: String!, $limit: Int, $nextToken: String) {
        getPublishedPostsForCompany(companyID: $companyID, limit: $limit, nextToken: $nextToken) {
            posts {
                postID
                companyID
                date
                groupID
                group {
                    groupID
                    groupName
                    description
                    colour
                }
                content {
                    text
                }
            }
            nextToken
        }
    }
`;
export const getPublishedPostsForGroup = /* GraphQL */ `
    query GetPublishedPostsForGroup(
        $companyID: String!
        $groupID: String!
        $limit: Int
        $nextToken: String
    ) {
        getPublishedPostsForGroup(
            companyID: $companyID
            groupID: $groupID
            limit: $limit
            nextToken: $nextToken
        ) {
            posts {
                postID
                companyID
                date
                groupID
                group {
                    groupID
                    groupName
                    description
                    colour
                }
                content {
                    text
                }
                TTL
            }
            nextToken
        }
    }
`;
export const getGroup = /* GraphQL */ `
    query GetGroup($companyID: String!, $groupID: String!) {
        getGroup(companyID: $companyID, groupID: $groupID) {
            companyID
            groupID
            groupName
            description
            colour
        }
    }
`;
export const getGroups = /* GraphQL */ `
    query GetGroups($companyID: String!, $limit: Int, $nextToken: String) {
        getGroups(companyID: $companyID, limit: $limit, nextToken: $nextToken) {
            groups {
                companyID
                groupID
                groupName
                description
                colour
            }
            nextToken
        }
    }
`;
export const getSchedule = /* GraphQL */ `
    query GetSchedule($companyID: String!, $scheduleID: String!) {
        getSchedule(companyID: $companyID, scheduleID: $scheduleID) {
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
export const getSchedulesForCompany = /* GraphQL */ `
    query GetSchedulesForCompany($companyID: String!, $limit: Int, $nextToken: String) {
        getSchedulesForCompany(companyID: $companyID, limit: $limit, nextToken: $nextToken) {
            schedules {
                companyID
                scheduleID
                groupID
                group {
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
            nextToken
        }
    }
`;
export const getSchedulesForGroup = /* GraphQL */ `
    query GetSchedulesForGroup(
        $companyID: String!
        $groupID: String!
        $limit: Int
        $nextToken: String
    ) {
        getSchedulesForGroup(
            companyID: $companyID
            groupID: $groupID
            limit: $limit
            nextToken: $nextToken
        ) {
            schedules {
                companyID
                scheduleID
                groupID
                TTL
                cronSchedule
                name
                description
            }
            nextToken
        }
    }
`;
