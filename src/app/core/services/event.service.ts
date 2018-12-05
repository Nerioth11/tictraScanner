import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {
    public constructor(private http: HttpClient) {}

    public checkEventTicket(eventId: number, code: number): Observable<{}> {
        return this.http.get(`https://tictra-test.appspot.com/NewCheckApp?eventId=${eventId}&code=${code}`);
    }
}
