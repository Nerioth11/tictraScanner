import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EventStatistic } from '../../app/shared/models/event-statistic.model';
import { EventService } from '../../app/core/services/event.service';
import { Event } from '../../app/shared/models/event.model';

@IonicPage({
  name: 'Statistics'
})

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  event: Event;
  invitationStatistics = new Array<EventStatistic>();
  standardStatistics = new Array<EventStatistic>();
  totalSelling = 0;
  totalChecked = 0;

  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventSvc: EventService,
    private toastCtrl: ToastController
  ) {
    this.event = this.navParams.get('event');
    this.getEventStatistics();
  }

  public getEventStatistics(): void {
    this.eventSvc.getEventStatistics(this.event.id).subscribe(
      statistics => {
        statistics.forEach(stat => {
          if (stat.isInvitation) {
            this.invitationStatistics.push(stat);
          } else {
            this.standardStatistics.push(stat);
          }
          this.totalChecked += stat.checked;
          this.totalSelling += stat.total;
        });
      },
      error => {
        let toast = this.toastCtrl.create({
          message: error.error.error,
          duration: 3000,
          position: "bottom"
        });
        toast.present();
      }
    )
  }

}
