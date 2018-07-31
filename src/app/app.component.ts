import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { NetworkServices } from '../services/networkServices';
import { OpenTicketsPage } from '../pages/open-tickets/open-tickets';
import { AuthServices } from '../services/authServices';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { User } from '../models/user';
import { FCM } from '@ionic-native/fcm';
import { TicketDetailsPage } from '../pages/ticket-details/ticket-details';
import { ToastServices } from '../services/toastServices';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  dashboardPage: any = DashboardPage;
  openTicketsPage: any = OpenTicketsPage;
  ticketDetailsPage: any = TicketDetailsPage;
  loginPage: any = LoginPage;
  rootPage: any = '';
  isAuthenticated: boolean = false;
  @ViewChild('nav') nav: NavController;
  userName: string = "User"

  constructor(public platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private networkServices: NetworkServices,
    private menuCntrl: MenuController, private authService: AuthServices,
    public alertCtrl: AlertController, public events: Events, public storage: Storage,
    public keyboard: Keyboard, public fcm: FCM, public toastServices: ToastServices) {


    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.fcmHandler();
      }
      this.networkServices.initilizeNetworkEvents();
      this.keyboard.hideKeyboardAccessoryBar(true);
      this.platform.registerBackButtonAction(()=>this.exit());

      this.storage.get('tkn').then((val) => {
        if (val !== undefined && val !== "" && val !== null) {
          this.isAuthenticated = true;
        }
      }).then(() => {
        this.changePage();
        this.getUserDetails();
      });


    });

    events.subscribe('user:login', () => {
      this.isAuthenticated = true;
      this.changePage();
      this.getUserDetails();
    });
    events.subscribe('user:invalid', () => {
      this.contLogout();
    });

  }

  changePage() {
    if (this.isAuthenticated) {
      this.nav.setRoot(this.openTicketsPage);
    } else {
      this.nav.setRoot(this.loginPage);
    }

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
            this.contLogout();
          }
        }
      ]
    });
    alert.present();
  }

  exit() {
    let currInstance = this.nav.getActive().instance;
    if (currInstance instanceof this.openTicketsPage || currInstance instanceof this.dashboardPage
      || currInstance instanceof this.loginPage) {
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Do you want to exit?',
        buttons: [ {
          text: "Cancel",
          role: 'cancel'
        },{
          text: "Ok",
          handler: () => { this.exitApp() }
        }]
      })
      alert.present();
    }else{
      this.nav.pop();
    }

  }
  exitApp() {
    this.platform.exitApp();
  }

  contLogout() {
    this.authService.logOut();
    this.isAuthenticated = false;
    this.nav.setRoot(this.loginPage);
  }

  getUserDetails() {
    this.storage.get('tkn').then((val) => {
      this.authService.getUserDetails(val).subscribe((data: User) => {
        this.userName = data.Fname;
      }, (err) => {

      });
    });
  }

  fcmHandler() {
    this.fcm.getToken().then(token => {
      this.storage.set('tknId', token);
    });
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        this.nav.push(this.ticketDetailsPage, {
          tktId: data.ID,
          isNotification: true
        });
      } else {
        this.toastServices.presentClosableToast('New incident received.Incident id: ' + data.ID
          + ' Please refresh the page.', 'bottom');
      }
    });
  }


}

