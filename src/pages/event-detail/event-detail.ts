import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';

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
  options: BarcodeScannerOptions;
  scannedData: any = {};


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public scanner: BarcodeScanner
  ) {
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
       },
      (error) => { 
        console.log( 'Error: ', error);
      }
    );
  }
}
