import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TicketDetailsPage } from '../pages/ticket-details/ticket-details';
import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { NetworkServices } from '../services/networkServices';
import { ToastServices } from '../services/toastServices';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    TicketDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    TicketDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NetworkServices,
    ToastServices,
    Network
  ]
})
export class AppModule { }
