import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EventStatistic } from '../../shared/models/event-statistic.model';

@Injectable()
export class EventService {
    public constructor(private http: HttpClient) { }

    public checkEventTicket(eventId: number, code: number): Observable<{}> {
        return this.http.get(`https://full-tictra.appspot.com/NewCheckApp?eventId=${eventId}&code=${code}`);
    }

    public getEventStatistics(eventId: number): Observable<EventStatistic[]> {
        return this.http.get<EventStatistic[]>(`https://full-tictra.appspot.com/StatisticsApp?event=${eventId}`);
    }
}
