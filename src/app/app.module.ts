import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TicketDetailsPage } from '../pages/ticket-details/ticket-details';
import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { NetworkServices } from '../services/networkServices';
import { ToastServices } from '../services/toastServices';
import { Device } from '@ionic-native/device';
import { AuthServices } from '../services/authServices';
import { HttpModule } from '@angular/http';
import { OpenTicketsPage } from '../pages/open-tickets/open-tickets';
import { sideMenu } from '../components/menu.component';
import { SignUpPage } from '../pages/sign-up/sign-up';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    DashboardPage,
    TicketDetailsPage,
    OpenTicketsPage,
    sideMenu
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    DashboardPage,
    TicketDetailsPage,
    OpenTicketsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NetworkServices,
    ToastServices,
    Network,
    Device,
    AuthServices
  ]
})
export class AppModule { }
