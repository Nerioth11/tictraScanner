import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../shared/models/event.model';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class UserService {
    public constructor(
        private http: HttpClient,
        private httpNative: HTTP
    ) { }

    public login(user: User): Promise<Object> {
        return this.httpNative.post('https://tictra-test.appspot.com/LogInNewApp', user, { 'Content-Type': 'application/json' });
    }

    public getUserEvents(userId: number): Observable<Event[]> {
        return this.http.get<Event[]>(`https://tictra-test.appspot.com/ListEventsNewApp?userId=${userId}`);
    }
}
