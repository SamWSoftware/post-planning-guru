import DynamoUtils from '@libs/dynamoDB';
import { AppSyncResolverEvent } from 'aws-lambda';
import * as parser from 'cron-parser';

interface UpdateScheduleArguments {
    scheduleID: string;
    companyID: string;
    groupID?: string;
    cronSchedule?: string;
    name?: string;
    description?: string;
}

let errorMessage = '';

const handler = async (event: AppSyncResolverEvent<UpdateScheduleArguments>) => {
    errorMessage = '';
    const { scheduleID, companyID, groupID, cronSchedule, name, description } = event.arguments;
    try {
        if (!companyID || !scheduleID) {
            errorMessage = 'companyID and scheduleID need to be provided';
            throw Error(errorMessage);
        }

        if (!groupID && !cronSchedule && !name && !description) {
            errorMessage = 'a field to update needs to be provided';
            throw Error(errorMessage);
        }
        const params = {
            hashKey: 'companyID',
            hashValue: companyID,
            rangeKey: 'scheduleID',
            rangeValue: scheduleID,
            tableName: process.env.SchedulesTable,
        };
        console.log('params', params);
        const schedule = await DynamoUtils.get<Schedule>(params);

        if (!schedule) {
            errorMessage = 'Unable to get the original schedule';
            throw Error(errorMessage);
        }
        const updatedSchedule = {
            ...schedule,
            groupID: groupID || schedule.groupID,
            cronSchedule: cronSchedule || schedule.cronSchedule,
            name: name || schedule.name,
            description: description || schedule.description,

            TTL: cronSchedule
                ? parser
                      .parseExpression(cronSchedule)
                      .next()
                      .getTime() / 1000
                : schedule.TTL,
        };

        await DynamoUtils.write({ data: updatedSchedule, tableName: process.env.SchedulesTable });

        return updatedSchedule;
    } catch (error) {
        console.log('error', error);
        throw Error(errorMessage || 'Unable to update the schedule');
    }
};
exports.handler = handler;
export default handler;
