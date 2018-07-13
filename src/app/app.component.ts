import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { NetworkServices } from '../services/networkServices';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  dashboardPage: any = DashboardPage;
  loginPage: any = LoginPage;
  rootPage: any = '';
  isAuthenticated: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen,private networkServices:NetworkServices) {
    if (this.isAuthenticated) {
      this.rootPage = this.dashboardPage;
    } else {
      this.rootPage = this.loginPage;
    }
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.networkServices.initilizeNetworkEvents();

    });

  }


}

