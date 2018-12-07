import { Component, trigger, transition } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Event } from '../../app/shared/models/event.model';
import { EventService } from '../../app/core/services/event.service';
import { TicketCheck } from '../../app/shared/models/ticket-check.model';
import { TicketStatus } from '../../app/shared/ui.utils';

@IonicPage({
  name: 'EventDetail'
})

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  event: Event;
  options: BarcodeScannerOptions;
  scannedData: any = {};
  ticketCheck: TicketCheck;
  statusType = TicketStatus;


  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public scanner: BarcodeScanner,
    private eventSvc: EventService,
    private toastCtrl: ToastController
  ) {
    this.event = this.navParams.get('event');
  }

  public goToEventStadistics() {
    this.navCtrl.push('Statistics', { event: this.event });
  }

  public scan(): void {
    this.ticketCheck = {
      status: 0
    }
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
        this.setTicketCheckStatus(res.code);
      },
      errorContainer => {
        this.setTicketCheckStatus(errorContainer.error.code, errorContainer.error.error);
        let toast = this.toastCtrl.create({
          message: errorContainer.error.error,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  public setTicketCheckStatus(code: TicketStatus, content?: string): void {
    // setTimeout(() => this.ticketCheck.status = code, 1000);
    this.ticketCheck.status = code;
    if (content) {
      this.ticketCheck.content = content;
    }
  }
}
