import { Time } from '@angular/common';

export interface IStatus{
    status_id   : number,
    player_id   : number,
    status_time : Time,
    status_date : Date,
    like        : number,
    dislike     : number,
    message     : string,
}