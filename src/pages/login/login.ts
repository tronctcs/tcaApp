import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController, Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthServices } from '../../services/authServices';
import { SignUpPage } from '../sign-up/sign-up';
import { Storage } from '@ionic/storage';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signUpPage: any = SignUpPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCntrl: LoadingController, public alertCntrl: AlertController,
    private authServices: AuthServices, public menuCntrl: MenuController,
    public storage: Storage, public events: Events, public statusBar:StatusBar) {
      this.statusBar.backgroundColorByHexString('#000000');
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
      .subscribe(data => {
        loading.dismiss();
        if (data) {
          this.storage.set('tkn', data).then(()=>{
            this.events.publish('user:login');
          });
          
          f.resetForm();
        } else {
          const alert = this.alertCntrl.create({
            message: 'Invalid Username or password',
            title: 'Signin Falied',
            buttons: ['Ok']
          });
          alert.present();
        }
      }, (err) => {
        loading.dismiss();
        const alert = this.alertCntrl.create({
          message: err._body,
          title: 'Signin Falied',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  signUp() {
    this.navCtrl.push(this.signUpPage);
  }

}
