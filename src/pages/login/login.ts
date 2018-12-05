import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../app/core/services/user.service';
import { LocalStorageService } from '../../app/core/services/local-storage.service';

@IonicPage({
  name: 'Login'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;

  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private localSvc: LocalStorageService,
    private toastCtrl: ToastController

  ) {
    this.createLoginForm();

    if (this.localSvc.get('userId') != undefined) {
      this.navCtrl.setRoot('Home');
    }
  }

  public createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this.localSvc.set('userId', '5680534013345792');
    this.navCtrl.setRoot('Home');
    // this.userSvc.login(this.loginForm.value)
    //   .subscribe((res: any) => {
    //     this.localSvc.set('userId', res.id);
    //     this.navCtrl.setRoot('Home');
    //   }), error => {
    //     let toast = this.toastCtrl.create({
    //       message: error.message,
    //       duration: 3000,
    //       position: 'bottom'
    //     });
    //     toast.present();
    //   };
  }

}