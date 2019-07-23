import { Time } from '@angular/common';

export class ITask {

    assigned_by: string;
    activity_name: string;
    start_date: Date;
    stop_date: Date;
    start_time: Time;
    end_time: Time;
    assigned_to: string;
    comment: string;
    daily: string;
    weekly: string;
}