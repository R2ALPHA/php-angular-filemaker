import { Time } from '@angular/common';

export class ITask {

    activity_id:number;
    player_id:number;
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
    day_start:Date;
    day_stop:Date;
    
}