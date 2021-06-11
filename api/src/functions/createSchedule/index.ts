import DynamoUtils from '@libs/dynamoDB';
import { AppSyncResolverEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import * as parser from 'cron-parser';

interface CreateScheduleArguments {
    companyID: string;
    groupID: string;
    cronSchedule: string;
    name?: string;
    description?: string;
}

let errorMessage = '';

const handler = async (event: AppSyncResolverEvent<CreateScheduleArguments>) => {
    errorMessage = '';
    const { companyID, groupID, cronSchedule, name, description } = event.arguments;
    try {
        if (!companyID || !groupID || !cronSchedule) {
            errorMessage = 'companyID, groupID and cronSchedule need to be provided';
            throw Error(errorMessage);
        }

        validateCronSchedule(cronSchedule);

        const schedule: Schedule = {
            companyID,
            scheduleID: uuid(),

            groupID,
            cronSchedule,
            name,
            description,

            TTL:
                parser
                    .parseExpression(cronSchedule)
                    .next()
                    .getTime() / 1000,
        };

        await DynamoUtils.write({ data: schedule, tableName: process.env.PostsTable });

        return schedule;
    } catch (error) {
        console.log('error', error);
        throw Error(errorMessage || 'Unable to create the schedule');
    }
};
exports.handler = handler;
export default handler;

const validateCronSchedule = schedule => {};
