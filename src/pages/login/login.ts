import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthServices } from '../../services/authServices';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCntrl: LoadingController, public alertCntrl: AlertController,
    private authServices: AuthServices, public menuCntrl:MenuController) {
  }

  ionViewDidEnter() {
    this.menuCntrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCntrl.enable(true);
}
  onSignin(f: NgForm) {
    const loading = this.loadingCntrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authServices.signIn(f.value.userid, f.value.password)
      .then(data => {
        loading.dismiss();
        console.log(data)
      })
      .catch(err => {
        loading.dismiss();
        const alert = this.alertCntrl.create({
          message: err.message,
          title: 'Signin Falied',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
