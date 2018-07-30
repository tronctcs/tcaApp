import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar) {
    this.statusBar.backgroundColorByHexString('#105ee8');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
