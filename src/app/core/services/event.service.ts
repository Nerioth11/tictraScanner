import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../shared/models/event.model';

@Injectable()
export class EventService {
    public constructor(private http: HttpClient) {}

    public checkEventTicket(eventId: number, code: number): Observable<{}> {
        return this.http.get(`https://tictra-test.appspot.com/NewCheckApp?eventId=${eventId}&code=${code}`);
    }
}
