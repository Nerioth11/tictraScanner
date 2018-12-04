import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Event } from '../../app/shared/models/event.model';
import { EventService } from '../../app/core/services/event.service';
import { TicketCheck } from '../../app/shared/models/ticket-check.model';
import { TicketStatus } from '../../app/shared/ui.utils';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'EventDetail'
})

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event: Event;
  options: BarcodeScannerOptions;
  scannedData: any = {};
  ticketCheck: TicketCheck;
  statusType = TicketStatus;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public scanner: BarcodeScanner,
    private eventSvc: EventService,
    private toastCtrl: ToastController
  ) {
    this.event = this.navParams.get('event');
  }

  public goToEventStadistics() {
  }

  public scan(): void {
    this.options = {
      'prompt': 'Por favor, escanee el código de barras',
    }
    this.scanner.scan().then(
      (data) => {
        this.scannedData = data;
        this.checkEventStatus();
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  public checkEventStatus(): void {
    this.eventSvc.checkEventTicket(this.event.id, this.scannedData.text).subscribe(
      (res: any) => {
        this.ticketCheck.status = 1;
        alert(res);
      },
      error => {
        let toast = this.toastCtrl.create({
          message: error.error,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }
}
