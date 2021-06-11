interface Schedule {
    companyID: string;
    scheduleID: string;

    groupID: string;

    TTL: number;
    cronSchedule: string;
    name?: string;
    description?: string;
}
