import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Tickets } from '../../models/tickets';
import { TicketServices } from '../../services/ticketServices';
import { Storage } from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-ticket-details',
  templateUrl: 'ticket-details.html',
})
export class TicketDetailsPage {
  public tktDetails: Tickets;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCntrl: MenuController, public ticketServices: TicketServices,
    public loadingCntrl: LoadingController, public alertCntrl: AlertController,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketDetailsPage');
  }
  ionViewDidEnter() {
    this.menuCntrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCntrl.enable(true);
  }
  ngOnInit(): void {
    this.tktDetails = this.navParams.get('tktDetails');
  }

  claimTicket() {
    const loading = this.loadingCntrl.create({
      content: 'Please wait...'
    });

    let alert = this.alertCntrl.create({
      title: 'Claim',
      message: 'Are you sure you want to claim this ticket?',
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
            this.storage.get('tkn').then((val) => {
              loading.present();
              this.ticketServices.claimTicket(this.tktDetails.IncId, val).subscribe((data) => {
                loading.dismiss();

                if (data === 1) {
                  this.ticketServices.handleAlert('Ticket claimed successfully. Please check cloud plus', 's');
                } else if (data === 2) {
                  this.ticketServices.handleAlert('Sorry, you are not authorized to claim the incident', 'e');
                } else if (data === 3) {
                  this.ticketServices.handleAlert('Some error occoured', 'e');
                } else {
                  this.ticketServices.handleAlert('Ticket already claimed by someone else.  Please check cloud plus', 's');
                }
                this.navCtrl.getPrevious().data.incId=this.tktDetails.IncId;
                this.navCtrl.pop();
              }, (err) => {
                loading.dismiss();
                this.ticketServices.handleAlert(err, 'E');
              });
            });
          }
        }
      ]
    });
    alert.present();
  }


}
