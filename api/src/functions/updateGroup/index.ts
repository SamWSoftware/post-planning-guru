import DynamoUtils from '@libs/dynamoDB';
import { AppSyncResolverEvent } from 'aws-lambda';

interface UpdateGroupArguments {
    companyID: string;
    groupID: string;
    groupName?: string;
    colour?: string;
    description?: string;
}

interface Group {
    companyID: string;
    groupID: string;
    groupName: string;
    description?: string;
    colour: string;
}

let errorMessage = '';

const handler = async (event: AppSyncResolverEvent<UpdateGroupArguments>) => {
    errorMessage = '';
    const { companyID, groupID, groupName, colour, description } = event.arguments;
    try {
        if (!companyID || !groupID) {
            errorMessage = 'companyID and groupID need to be provided';
            throw Error(errorMessage);
        }

        if (!groupName && !colour && !description) {
            errorMessage = 'a field to update needs to be provided';
            throw Error(errorMessage);
        }
        const params = {
            hashKey: 'companyID',
            hashValue: companyID,
            rangeKey: 'groupID',
            rangeValue: groupID,
            tableName: process.env.GroupsTable,
        };
        const group = await DynamoUtils.get<Group>(params);

        if (!group) {
            errorMessage = 'Unable to get the original group';
            throw Error(errorMessage);
        }
        const updatedGroup = {
            ...group,
            groupName: groupName || group.groupName,
            colour: colour || group.colour,
            description: description || group.description,
        };

        await DynamoUtils.write({ data: updatedGroup, tableName: process.env.GroupsTable });

        return updatedGroup;
    } catch (error) {
        console.log('error', error);
        throw Error(errorMessage || 'Unable to update the group');
    }
};
exports.handler = handler;
export default handler;
