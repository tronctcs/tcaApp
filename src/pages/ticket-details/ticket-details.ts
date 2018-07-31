import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Tickets } from '../../models/tickets';
import { TicketServices } from '../../services/ticketServices';
import { Storage } from "@ionic/storage";
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-ticket-details',
  templateUrl: 'ticket-details.html',
})
export class TicketDetailsPage {
  public tktDetails: Tickets;
  public tktId:string='';
  public isNotification:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public ticketServices: TicketServices,
    public loadingCntrl: LoadingController, public alertCntrl: AlertController,
    public storage: Storage, public statusBar: StatusBar) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketDetailsPage');
  }
  ionViewWillEnter(){
    this.statusBar.backgroundColorByHexString('#105ee8');
    this.statusBar.styleLightContent();
  }
  
  ngOnInit(): void {
    this.tktDetails = this.navParams.get('tktDetails');
    this.tktId=this.navParams.get('tktId');
    this.isNotification=this.navParams.get('isNotification');
    if(this.isNotification && this.tktId){
      this.getTicketDetails(this.tktId);
    }
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

  getTicketDetails(tktId){
    const loading = this.loadingCntrl.create({
      content: 'Please wait...'
    });
    this.storage.get('tkn').then((val) => {
    this.tktDetails= this.ticketServices.getTicketDetails(tktId,val);
    }).then(()=>{
      loading.dismiss();
    });
  }


}
