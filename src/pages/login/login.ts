import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HTTP } from '@ionic-native/http';

@IonicPage()
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
    private http: HTTP
  ){
    this.createLoginForm();
  }

  public createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public login(): void{

    this.http.post('https://tictra-test.appspot.com/LogInAppControl',
      this.loginForm.value, { 'Content-Type': 'application/json' })
      .then(result => {
        if(result.data != 'KO'){
          this.navCtrl.setRoot('Home', { userId: result.data })
        }
        alert(result.data);
      })
      .catch( error => alert('Usuario o contraseña erróneos'));
  }

}