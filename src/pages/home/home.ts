import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';


@IonicPage({
  name: 'Home'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  userId: number;

  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HTTP
  ) {
    this.userId = this.navParams.get('userId');
    this.getUserEvents();
  }

  public getUserEvents(): void {
    this.http.get('https://tictra-test.appspot.com/list_events_pda?userId=' + this.userId, {}, { 'Content-Type': 'application/json' })
    .then( result => alert(result.data))
  }

  public logout(): void {
  }

  public viewDetail(): void {
    this.navCtrl.push('EventDetail');
  }
}
