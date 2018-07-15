import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { NetworkServices } from '../services/networkServices';
import { OpenTicketsPage } from '../pages/open-tickets/open-tickets';
import { AuthServices } from '../services/authServices';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  dashboardPage: any = DashboardPage;
  openTicketsPage:any=OpenTicketsPage;
  loginPage: any = LoginPage;
  rootPage: any = '';
  isAuthenticated: boolean = true;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen,private networkServices:NetworkServices, 
     private menuCntrl:MenuController, private authService:AuthServices, public alertCtrl:AlertController) {
    if (this.isAuthenticated) {
      this.rootPage = this.openTicketsPage;
    } else {
      this.rootPage = this.loginPage;
    }
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.networkServices.initilizeNetworkEvents();

    });

  }
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCntrl.close();
  }

  onLogout() {
    this.menuCntrl.close();
    this.presentConfirm();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.authService.logOut();
            this.isAuthenticated = false;
            this.nav.setRoot(this.loginPage);
          }
        }
      ]
    });
    alert.present();
  }


}

