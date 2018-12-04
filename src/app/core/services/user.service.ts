import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../shared/models/event.model';

@Injectable()
export class UserService {
    public constructor(private http: HttpClient) {}

    public login(user: User): Observable<Object> {
        return this.http.post('https://tictra-test.appspot.com/LogInNewApp', user);
    }

    public getUserEvents(userId: number): Observable<Event[]> {
        return this.http.get<Event[]>(`https://tictra-test.appspot.com/ListEventsNewApp?userId=${userId}`);
    }
}
