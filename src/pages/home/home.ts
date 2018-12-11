import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserService } from '../../app/core/services/user.service';
import { LocalStorageService } from '../../app/core/services/local-storage.service';
import { Event } from '../../app/shared/models/event.model';


@IonicPage({
  name: 'Home'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  userId: number;
  userEvents: Event[];

  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localSvc: LocalStorageService,
    private userSvc: UserService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.userId = this.localSvc.get('userId');
    this.getUserEvents();
  }

  public getUserEvents(): void {
    this.userSvc.getUserEvents(this.userId)
      .subscribe(
        events => this.userEvents = events,
      ), error => {
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: "bottom"
        });
        toast.present();
      };
  }

  public logout(): void {
    this.localSvc.clear();
    this.showConfirmDialog();
  }

  public showConfirmDialog(): void {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Está seguro de que desea cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.navCtrl.setRoot('Login');
          }
        }
      ]
    });
    alert.present();
  }

  public viewDetail(event: Event): void {
    this.navCtrl.push('EventDetail', { event: event });
  }
}
