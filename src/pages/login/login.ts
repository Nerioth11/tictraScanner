import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../app/core/services/user.service";
import { LocalStorageService } from "../../app/core/services/local-storage.service";

@IonicPage({
  name: "Login"
})
@Component({
  selector: "page-login",
  templateUrl: "login.html"
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
    this.localSvc.clear();
    this.createLoginForm();

    if (this.localSvc.get("userId") != undefined) {
      this.navCtrl.setRoot("Home");
    }
  }

  public createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  public login(): void {
    this.userSvc
      .login(this.loginForm.value)
      .then((res: any) => {
        this.localSvc.set("userId", JSON.parse(res.data).id);
        this.navCtrl.setRoot("Home");
      })
      .catch(error => {
        let toast = this.toastCtrl.create({
          message: JSON.parse(error.error).error,
          duration: 3000,
          position: "bottom"
        });
        toast.present();
      });
  }
}
